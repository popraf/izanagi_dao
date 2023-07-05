import { createContext } from 'react'
import { useContract, useSDK, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";
import { contract_abi } from "../utils/ContractABI.json";
import { AddressContext } from '../context/AddressContext';
import { useContract, useSDK, useContractRead } from "@thirdweb-dev/react";


const ProposalContext = createContext()

const ProposalProvider = ({ children }) => {
    const address = useContext(AddressContext);
    const sdk = useSDK();
    const contract_address=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const { contract, isLoading, error } = useContract(
        contract_address,
        contract_abi.abi
    );

    function getBalance() {
        const { getBalance_data, getBalance_isLoading, getBalance_error } = useContractRead(contract,'getBalance');
    }

    function isContributor() {
        const { isContributor_data, isContributor_isLoading, isContributor_error } = useContractRead(contract,'isContributor');
    }

    function isStakeholder() {
        const { isStakeholder_data, isStakeholder_isLoading, isStakeholder_error } = useContractRead(contract,'isStakeholder');
    }

    function getStakeholderVotes() {
        const { getStakeholderVotes_data, getStakeholderVotes_isLoading, getStakeholderVotes_error } = useContractRead(contract,'getStakeholderVotes');
    }

    function getProposals() {
        const { getProposals_data, getProposals_isLoading, getProposals_error } = useContractRead(contract,'getProposals');
    }

    function getProposal(id) {
        const { getProposals_data, getProposals_isLoading, getProposals_error } = useContractRead(contract,'getProposals', [id]);
    }

    return (
        <ProposalContext.Provider value={{ 
            getBalance_data,
            isContributor_data,
            isStakeholder_data
             }}>
          {children}
        </ProposalContext.Provider>
      );
};

export default {ProposalContext, ProposalProvider};

// //Import Dependencies and hooks needed for app
// import { createContext } from 'react'
// import {
//     useVote,
//     useToken,
//     useAddress,
//     useMetamask,
//     useDisconnect,
// } from '@thirdweb-dev/react'
// import { VoteType } from '@thirdweb-dev/sdk'
// import { ethers } from 'ethers'

// export const ProposalContext = createContext()
// export const ProposalContextProvider = ({ children }) => {

//     /*
//       Step 1. Get User address using thirdwebs hook
//       Step 2. Get Token and vote contract instances using thirdwebs hooks
//       Step 3. We need way to connect and disconnect from the dapp. 
//     */
//     const currentUserAddress = true //Get the address using thirdwebs convenient hooks

//     let vote = ''
//     let token = ''
//     let connectWithMetamask = '';
//     let disconnectWallet = '';




//     //Get all the proposals in the contract
//     const getAllProposals = async () => {

//     }

//     //Check if proposal given is executable
//     const isExecutable = async id => {

//     }

//     //Check if the user has voted for the given proposal
//     const checkIfVoted = async id => {

//     }

//     //Create  proposal to mint tokens to the DAO's treasury
//     const createProposal = async description => {

//     }


//     //Execute proposal if the proposal is successful
//     const executeProposal = async id => {

//     }


//     //Vote for the proposal and delegate tokens if not already done. 
//     const voteFor = async (id, type, reason) => {

//     }
//     return (
//         <ProposalContext.Provider
//             value={{
//                 getAllProposals,
//                 isExecutable,
//                 voteFor,
//                 createProposal,
//                 currentUserAddress,
//                 connectWithMetamask,
//                 disconnectWallet,
//                 executeProposal,
//             }}
//         >
//             {children}
//         </ProposalContext.Provider>
//     )
// }