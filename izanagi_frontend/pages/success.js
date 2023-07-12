import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import BaseLayout from "../components/BaseLayout";


export default function Success() {
  return (
    <BaseLayout>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Thank you for being <a href="/">proactive</a>!
        </h1>

        <p className={styles.description}>
        Proposal added successfully.
        </p>

        <div >
          <ConnectWallet className="customConnectButton"/>
        </div>

      </main>
    </div>
    </BaseLayout>
  );
}
