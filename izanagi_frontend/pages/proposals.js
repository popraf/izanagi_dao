import BaseLayout from "../components/BaseLayout";
import { useContext, useEffect, useState } from 'react';
import Loader from "../components/Loader";
import NewProposalStyles from "../styles/NewProposal.module.css";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Proposals.module.css";
import { ToastContainer, toast } from 'react-toastify';
import { AddressContext } from "../context/AddressContext";
import { useContractRead } from "@thirdweb-dev/react";
import { utils } from "ethers";
import ProposalCard from "../components/ProposalCard";

const Proposals = () => {
  const {address, contract} = useContext(AddressContext);
  const { data: getProposalsData, isLoading: getProposalsIsLoading, error: getProposalsError } = useContractRead(contract,'getProposals',[], {from:address});

  // console.log(getProposalsData);

  return(
    <BaseLayout>
       <div className={styles.main}>
         <h1 className={styles.title}>Search through <a>the proposals</a></h1>
           <div >
             <div >
              {
                (!getProposalsIsLoading && 
                getProposalsData.length>0 &&
                getProposalsData.some(data => !data.paid))?
                getProposalsData.map(
                  data => !data.paid?
                    <ProposalCard key={Math.random()} proposal={data} />
                    :null
                ):
                <h2>No active proposals found</h2>
              }
             </div>
           </div>

          <h2 className={styles.title}>Finished <a>proposals</a></h2>
           <div >
             <div >
              {
                (!getProposalsIsLoading && 
                getProposalsData.length>0 &&
                getProposalsData.some(data => data.paid))?

                getProposalsData.map(
                  data => data.paid?
                    <ProposalCard key={Math.random()} proposal={data} />
                    :null
                ):
                <h2>No finished proposals found</h2>
              }
             </div>
           </div>

      </div>
    </BaseLayout>
  );
};

export default Proposals;