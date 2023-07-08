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

  console.log(getProposalsData);

  return(
    <BaseLayout>
       <div className={styles.main}>
         <h1 className={styles.title}>Search through <a>the proposals</a></h1>
        
           <div className={styles.wrapper}>
             <div className={styles.proposals}>
              {
                !getProposalsIsLoading && 
                getProposalsData && 
                getProposalsData.map(
                  data =>
                    {
                      return (<ProposalCard key={Math.random()} proposal={data} />)
                    }
                )
              }
             </div>
           </div>

      </div>
    </BaseLayout>
  );
};

export default Proposals;