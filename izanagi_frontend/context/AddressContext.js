import { createContext } from "react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import contract_abi from "../utils/ContractABI.json";

const AddressContext = createContext({});

const AddressProvider = ({ children }) => {
    const address = useAddress(); // Thirdweb hook, which reads address from connected ConnectWallet
    const useLocalhost = process.env.NEXT_PUBLIC_USE_LOCALHOST;

    let contract_address;
    if(useLocalhost) {
      contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Points to smart contract address
    } else {
      contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MUMBAI; // Points to smart contract address
    }

    const { contract } = useContract(
      contract_address,
      contract_abi.abi
  );

    return (
        <AddressContext.Provider value={{ address, contract }}>
          {children}
        </AddressContext.Provider>
      );
};

export { AddressContext, AddressProvider };
