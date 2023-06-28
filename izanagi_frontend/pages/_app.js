import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SidebarProvider } from "../context/SidebarContext";
import { Polygon } from "@thirdweb-dev/chains";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const _my_chainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      desiredChainId={_my_chainId}
      activeChain={_my_chainId}
      // supportedChains={[Polygon]}
      // activeChain={Polygon}
      // authConfig={{
      //   authUrl: "/api/auth",
      //   domain: "localhost:3000",
      //   loginRedirect: "/",
      // }}
      >
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
