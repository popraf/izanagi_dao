// import { createContext, useContext } from "react";
// import { useContractRead } from "@thirdweb-dev/react";
// import { AddressContext } from "./AddressContext";
// import { ethers, utils } from "ethers";






// const {address, contract} = useContext(AddressContext);

// // getProposals view:
//     let getProposals = 'N/A';

//     if (address) {
//         const { data: getProposalsData, isLoading: getProposalsIsLoading, error: getProposalsError } = useContractRead(contract,'getProposals');

//         if (getProposalsIsLoading) {
//             getProposals = 'Loading...';
//         } else if ((getProposalsData === undefined) || getProposalsError) {
//             getProposals = 'Error fetching getProposals';
//         } else {
//             getProposals = getProposalsData;
//         }
//     }
