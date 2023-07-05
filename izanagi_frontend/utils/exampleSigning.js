import { useContract, useSDK, useContractRead } from "@thirdweb-dev/react";
import contract_abi from "./ContractABI.json";
import { useState } from "react";


const Sign = () => {
    const sdk = useSDK();

    const [signature, setSignature] = useState('N/A');
    const [address, setAddress] = useState('N/A');

    const message = "Sign me! (message const)";

    const signMessage = async () => {
        const sig = await sdk?.wallet.sign(message);

        if (!sig) {
            throw new Error('No signature!');
        }
        setSignature(sig);
    }

    // Same as useAddress
    const recoverAddress = () => {
        const addr = sdk?.wallet.recoverAddress(message, signature);

        if (!addr) {
            throw new Error('No address!');
        }
    }

  return (
    <div>
        <button onClick={signMessage}>Sign ME</button>
    </div>
  );
}

export default TestContract;