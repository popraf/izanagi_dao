import { createContext, useContext } from "react";
import { useContractRead } from "@thirdweb-dev/react";
import { AddressContext } from "./AddressContext";
import { ethers, utils } from "ethers";

const ContractViewsContext = createContext({});

const ContractViewsProvider = ({ children }) => {
    const {contract} = useContext(AddressContext);

    // getBalance view function:
    const { data: getBalanceData, isLoading: getBalanceIsLoading, error: getBalanceError } = useContractRead(contract,'getBalance');
    let userBalance;

    if (getBalanceIsLoading) {
        userBalance = 'Loading...';
    } else if ((getBalanceData === undefined) || getBalanceError) {
        userBalance = 'Error fetching price';
    } else {
        userBalance = getBalanceData.toString() === '0' ? 'Free' : `${utils.formatEther(getBalanceData)} MATIC`;
    }

    // isStakeholder view:
    const { data: isStakeholderData, isLoading: isStakeholderIsLoading, error: isStakeholderError } = useContractRead(contract,'isStakeholder');
    let isStakeholder;

    if (isStakeholderIsLoading) {
        isStakeholder = 'Loading...';
    } else if ((isStakeholderData === undefined) || isStakeholderError) {
        isStakeholder = 'Error fetching isStakeholder';
    } else {
        console.log('isStakeholderData:', isStakeholderData);
        isStakeholder = isStakeholderData.toString() === '0' ? false : true;
    }

    // isContributor view:
    const { data: isContributorData, isLoading: isContributorIsLoading, error: isContributorError } = useContractRead(contract,'isContributor');
    let isContributor;

    if (isContributorIsLoading) {
        isContributor = 'Loading...';
    } else if ((isContributorData === undefined) || isContributorError) {
        isContributor = 'Error fetching isContributor';
    } else {
        isContributor = isContributorData.toString() === '0' ? false : true;
    }

    // getStakeholderVotes view:
    const { data: getStakeholderVotesData, isLoading: getStakeholderVotesIsLoading, error: getStakeholderVotesError } = useContractRead(contract,'getStakeholderVotes');
    let getStakeholderVotes;

    if (getStakeholderVotesIsLoading) {
        getStakeholderVotes = 'Loading...';
    } else if (getStakeholderVotesError.reason == "User is not a stakeholder") {
        getStakeholderVotes = "You are not a stakeholder. Please contribute to project at least 5 MATIC."
    } else if ((getStakeholderVotesData === undefined) || getStakeholderVotesError) {
        getStakeholderVotes = 'Error fetching getStakeholderVotes';
    } else {
        getStakeholderVotes = getStakeholderVotesData;
    }

    // getProposals view:
    const { data: getProposalsData, isLoading: getProposalsIsLoading, error: getProposalsError } = useContractRead(contract,'getProposals');
    let getProposals;

    if (getProposalsIsLoading) {
        getProposals = 'Loading...';
    } else if ((getProposalsData === undefined) || getProposalsError) {
        getProposals = 'Error fetching getProposals';
    } else {
        getProposals = getProposalsData;
    }

    // Variables passed into provider, making them available across wrapped elements in app
    const propsValues = {
        userBalance,
        isStakeholder,
        isContributor,
        getStakeholderVotes,
        getProposals
    }
  
    return (
        <ContractViewsContext.Provider value={ propsValues }>
          {children}
        </ContractViewsContext.Provider>
      );
};

export { ContractViewsContext, ContractViewsProvider };