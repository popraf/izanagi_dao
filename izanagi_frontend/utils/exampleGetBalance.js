import { useContract, useSDK, useContractRead, useAddress } from "@thirdweb-dev/react";
import contract_abi from "./ContractABI.json";
import { useState } from "react";
import { ethers, utils } from "ethers";

const GetBalance = () => {
    const contract_address=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const sdk = useSDK();
    const [signature, setSignature] = useState('N/A');
    // const [address, setAddress] = useState('N/A');

    const address = useAddress();
    const { contract, isLoading, error } = useContract(
        contract_address,
        contract_abi.abi
    );

    const { data, isLoading:_isLoading, error:err } = useContractRead(contract,'getBalance');
    function _getBalance() {
      console.log(isLoading);
      console.log(error);
      if (contract) {
          console.log('ADDR', address,'contract',contract,'----- DATA:', data, 'ISLOADING:', isLoading, 'formatted balance', utils.formatEther(data));
      }
  }

  return (
    <div>
        {/* <div>_isLoading: {_isLoading} </div>
        <div>_error: {_error} </div>
        <div>data: {data} </div> */}
      <button onClick={_getBalance}>Get Balance</button>
    </div>
  );
}

export default GetBalance;