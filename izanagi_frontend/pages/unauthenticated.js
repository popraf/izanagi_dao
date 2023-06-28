import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import BaseLayout from "../components/BaseLayout";


export default function Unauthenticated() {
  return (
    <BaseLayout>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Please login to <a href="/">Izanagi DAO</a>!
        </h1>

        <p className={styles.description}>
        You are unauthorized to see this site.
        </p>

        <div >
          <ConnectWallet className="customConnectButton"/>
        </div>

      </main>
    </div>
    </BaseLayout>
  );
}
