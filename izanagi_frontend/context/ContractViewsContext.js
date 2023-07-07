import { createContext, useContext, useEffect } from "react";
import { useContractRead } from "@thirdweb-dev/react";
import { AddressContext } from "./AddressContext";
import { ethers, utils } from "ethers";

const ContractViewsContext = createContext({});

const ContractViewsProvider = ({ children }) => {
    const {address, contract} = useContext(AddressContext);

    const { data: getBalanceData, isLoading: getBalanceIsLoading, error: getBalanceError } = useContractRead(contract,'getBalance',[],{from:address});
    const { data: isStakeholderData, isLoading: isStakeholderIsLoading, error: isStakeholderError } = useContractRead(contract,'isStakeholder',[],{from:address});
    const { data: isContributorData, isLoading: isContributorIsLoading, error: isContributorError } = useContractRead(contract,'isContributor',[],{from:address});

    // getBalance view function:
    let userBalance = 'N/A';

    if (address) {
        if (getBalanceIsLoading) {
            userBalance = 'Loading...';
        } else if ((getBalanceData === undefined) || getBalanceError) {
            userBalance = 'Error fetching price';
        } else {
            userBalance = getBalanceData.toString() === '0' ? '0 MATIC Contributed' : `${utils.formatEther(getBalanceData)} MATIC Contributed`;
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

    let userStatus;
    if (!address || isStakeholderError || isContributorError) {
        userStatus = 'N/A';
    } else {
        if (!isContributor) {
            userStatus = 'Standard';
          } else if (isContributor && isStakeholder) {
            userStatus = 'Stakeholder';
          } else if (isContributor && !isStakeholder){
            userStatus = 'Contributor';
          } else {
            userStatus = 'Error fetching the data';
          }      
    }

    // Variables passed into provider, making them available across wrapped elements in app
    const propsValues = {
        userBalance,
        isStakeholder,
        isContributor,
        userStatus
    }
  
    return (
        <ContractViewsContext.Provider value={ propsValues }>
          {children}
        </ContractViewsContext.Provider>
      );
};

export { ContractViewsContext, ContractViewsProvider };