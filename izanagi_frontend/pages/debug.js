import BaseLayout from "../components/BaseLayout";
import { useContext, useEffect, useState } from "react";
// import { getBalance } from "../utils/contractViews";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import contract_abi from "../utils/ContractABI.json";
import { AddressContext } from "../context/AddressContext";
import ExampleCall from "../utils/exampleContractViewCall";
import { ethers, utils } from "ethers";
import { ContractViewsContext } from "../context/ContractViewsContext";
import GetBalance from "../utils/exampleGetBalance";

const Debug = () => {
    const {userBalance,
      isStakeholder,
      isContributor,
      getStakeholderVotes,
      getProposals
    } = useContext(ContractViewsContext);

  return(
  <BaseLayout>
        <h1>Debug</h1>
        
        <h1>DEBUG CONTRACT FUNCTIONS</h1>
        <li>userBalance: {userBalance}</li>
        <li>isStakeholder: {isStakeholder}</li>
        <li>isContributor: {isContributor}</li>
        <li>getStakeholderVotes: {getStakeholderVotes}</li>
        <li>getProposals: {getProposals}</li>
    <GetBalance />
  </BaseLayout>
  );
};

export default Debug;