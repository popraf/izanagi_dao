import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SidebarProvider } from "../context/SidebarContext";
import { Polygon } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { AddressProvider } from "../context/AddressContext";
import { ContractViewsProvider } from "../context/ContractViewsContext";

function MyApp({ Component, pageProps }) {
  const useLocalhost = process.env.NEXT_PUBLIC_USE_LOCALHOST;

  // This is the chain your dApp will work on. Change this to the chain your app is built for.
  // You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
  let _my_chainId;
  if(useLocalhost) {
    _my_chainId = ChainId.Localhost;
  } else {
    _my_chainId = ChainId.Mumbai;
  }

  return (
    <ThirdwebProvider desiredChainId={_my_chainId} activeChain={_my_chainId} >
      <AddressProvider>
        <ContractViewsProvider>
          <SidebarProvider>
            <Component {...pageProps} />
          </SidebarProvider>
        </ContractViewsProvider>
      </AddressProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
