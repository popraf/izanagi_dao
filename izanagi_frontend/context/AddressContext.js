import { createContext, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

const AddressContext = createContext({});

const AddressProvider = ({ children }) => {
    const address = useAddress();

    return (
        <AddressContext.Provider value={{ address }}>
          {children}
        </AddressContext.Provider>
      );
};

export { AddressContext, AddressProvider };