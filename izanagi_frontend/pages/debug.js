import BaseLayout from "../components/BaseLayout";
import { useContext } from "react";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import {
    useAddress,
    useMetamask,
    useLogin,
    useLogout,
    useUser,
  } from "@thirdweb-dev/react";
import { SignerWallet } from "@thirdweb-dev/auth/evm";
import { ethers } from "ethers";
import ExampleCall from "../utils/exampleContractViewCall";

const Debug = () => {

  return(
  <BaseLayout>
        <h1>Debug</h1>
        
        <h1>DEBUG CONTRACT FUNCTIONS</h1>
      <ExampleCall />
  </BaseLayout>
  );
};

export default Debug;