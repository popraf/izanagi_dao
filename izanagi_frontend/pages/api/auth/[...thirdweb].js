import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
// import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
    privateKey: process.env.MY_PRIVATE_KEY,
    domain: "localhost:3000",
  });
  
export default ThirdwebAuthHandler();
