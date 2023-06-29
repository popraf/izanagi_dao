import { useContract, useSDK, useContractRead } from "@thirdweb-dev/react";
import contract_abi from "./ContractABI.json";
import { useState } from "react";
const { CONTRACT_ADDRESS } = require('../.env.json');


const ExampleCall = () => {
    const contract_address=CONTRACT_ADDRESS;
    const sdk = useSDK();
    const [signature, setSignature] = useState('N/A');
    const [address, setAddress] = useState('N/A');

    const { contract, isLoading, error } = useContract(
        contract_address,
        contract_abi.abi
    );
    

    const { data, _isLoading, _error } = useContractRead(contract,'getProposals');


    function _getProposals() {
        // console.log(contract);
        console.log(isLoading);
        console.log(error);
        if (contract) {
            
            <div>button data: {data} </div>
            console.log('----- DATA:', data, 'ISLOADING:', isLoading);
        }
    }

  return (
    <div>
        {/* <div>_isLoading: {_isLoading} </div>
        <div>_error: {_error} </div>
        <div>data: {data} </div> */}
      <button onClick={_getProposals}>Get Contract Value</button>
    </div>
  );
}

export default ExampleCall;