import { createContext, useContext, useEffect } from "react";
import { useContractRead } from "@thirdweb-dev/react";
import { AddressContext } from "./AddressContext";
import { ethers, utils } from "ethers";

const ContractViewsContext = createContext({});

const ContractViewsProvider = ({ children }) => {
    const {address, contract} = useContext(AddressContext);

    const { data: getBalanceData, isLoading: getBalanceIsLoading, error: getBalanceError } = useContractRead(contract,'getBalance');
    const { data: isStakeholderData, isLoading: isStakeholderIsLoading, error: isStakeholderError } = useContractRead(contract,'isStakeholder');
    const { data: isContributorData, isLoading: isContributorIsLoading, error: isContributorError } = useContractRead(contract,'isContributor');
    
    // getBalance view function:
    let userBalance = 'N/A';

    if (address) {
        if (getBalanceIsLoading) {
            userBalance = 'Loading...';
        } else if ((getBalanceData === undefined) || getBalanceError) {
            userBalance = 'Error fetching price';
        } else {
            userBalance = getBalanceData.toString() === '0' ? '0 MATIC Contributed' : `${utils.formatEther(getBalanceData)} MATIC`;
        }    
    }

    // isStakeholder view:
    let isStakeholder = 'N/A';

    if (address) {
        if (isStakeholderIsLoading) {
            isStakeholder = 'Loading...';
        } else if ((isStakeholderData === undefined) || isStakeholderError) {
            isStakeholder = 'Error fetching isStakeholder';
        } else {
            // console.log('isStakeholderData:', isStakeholderData);
            isStakeholder = isStakeholderData;
        }    
    }

    // isContributor view:
    let isContributor = 'N/A';

    if (address) {
        if (isContributorIsLoading) {
            isContributor = 'Loading...';
        } else if ((isContributorData === undefined) || isContributorError) {
            isContributor = 'Error fetching isContributor';
        } else {
            isContributor = isContributorData;
        }
    }

    // getStakeholderVotes view:
    let getStakeholderVotes = 'You are not a stakeholder. Contribution of at least 5 MATIC enables voting.';

    if (address && isStakeholder == true) {
        const { data: getStakeholderVotesData, isLoading: getStakeholderVotesIsLoading, error: getStakeholderVotesError } = useContractRead(contract,'getStakeholderVotes');

        if (getStakeholderVotesIsLoading) {
            getStakeholderVotes = 'Loading...';
        } else if (getStakeholderVotesError.reason == "User is not a stakeholder") {
            getStakeholderVotes = "You are not a stakeholder. Contribution of at least 5 MATIC enables voting."
        } else if ((getStakeholderVotesData === undefined) || getStakeholderVotesError) {
            getStakeholderVotes = 'Error fetching getStakeholderVotes';
        } else {
            getStakeholderVotes = getStakeholderVotesData;
        }
    }

    // Variables passed into provider, making them available across wrapped elements in app
    const propsValues = {
        userBalance,
        isStakeholder,
        isContributor,
        getStakeholderVotes
    }
  
    return (
        <ContractViewsContext.Provider value={ propsValues }>
          {children}
        </ContractViewsContext.Provider>
      );
};

export { ContractViewsContext, ContractViewsProvider };