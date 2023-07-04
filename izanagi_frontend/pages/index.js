import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import BaseLayout from "../components/BaseLayout";
import Link from 'next/link'

export default function Home() {
  return (
    <BaseLayout>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">Izanagi DAO</a>!
        </h1>

        <p className={styles.description}>
        Members of Izanagi DAO have the opportunity to propose projects that aim to create positive change in society.
        </p>

        <div >
          <ConnectWallet className="customConnectButton"/>
        </div>

        <div className={styles.grid}>
          <Link href="/about" className={styles.card}>
            <h2>About &rarr;</h2>
            <p>
              Learn more about decentralized nature of the project, enabling
              individuals to work towards common social objectives.
            </p>
          </Link>

          <Link href="/proposals" className={styles.card}>
            <h2>Proposals &rarr;</h2>
            <p>
            
            Vote to allocate resources and financial support to the selected projects, enabling them to come to fruition.
            </p>
          </Link>

          <Link
            href="/new_proposal"
            className={styles.card}
          >
            <h2>New Proposal &rarr;</h2>
            <p>
              Submit project ideas and initiatives for funding,
              fostering a collective effort to address societal challenges. 
            </p>
          </Link>
        </div>
      </main>
    </div>
    </BaseLayout>
  );
}
