import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
// import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
    privateKey: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
    domain: "localhost:3000",
  });
  
export default ThirdwebAuthHandler();
