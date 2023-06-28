import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
//   privateKey: toString(process.env.THIRDWEB_AUTH_PRIVATE_KEY),
wallet: new PrivateKeyWallet(toString(process.env.THIRDWEB_AUTH_PRIVATE_KEY) || ""),
domain: "localhost:3000",
});

export default ThirdwebAuthHandler();
