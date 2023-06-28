import BaseLayout from "../components/BaseLayout";
import { useContext } from "react";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import {
    useAddress,
    useMetamask,
    useLogin,
    useLogout,
    useUser,
  } from "@thirdweb-dev/react";
import { SignerWallet } from "@thirdweb-dev/auth/evm";
import { ethers } from "ethers";

const Debug = () => {

            // // Pass private key from environment variables directly
            // const wallet = new PrivateKeyWallet(
            //     process.env.THIRDWEB_AUTH_PRIVATE_KEY,
            // );

            // // Create a new ethers signer or use an existing one
            // const signer = new ethers.Wallet(wallet);
            // const signer_wallet = new SignerWallet(signer);

    const address = useAddress();
    const connect = useMetamask();
    const { login } = useLogin();
    const { logout } = useLogout();
    const { user, isLoggedIn, isLoading } = useUser();

  return(
  <BaseLayout>
    <h1>Debug</h1>
    <div>
        {isLoggedIn ? 'isLoggedIn Y' : 'isLoggedIn N'}
    </div>
    <div>
        {address ? 'address Y' : 'address N'}
    </div>
    <div>
        {isLoading ? 'isLoading Y' : 'isLoading N'}
    </div>

    <div>
      {isLoggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : address ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}

      <pre>Connected Wallet: {address}</pre>
      <pre>const connect: {connect}</pre>
      <pre>User addr: {user?.address || "N/A"}</pre>
      <pre>User: {user}</pre>
    </div>

    <div>
      {isLoggedIn ? (
        <p>Here's some content only visible to logged in users.</p>
      ) : (
        <p>Here's some content only visible to logged out users.</p>
      )}
    </div>

    <button onClick={() => logout()}>Logout</button>

  </BaseLayout>
  );
};

export default Debug;