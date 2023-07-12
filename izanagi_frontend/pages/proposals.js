import BaseLayout from "../components/BaseLayout";
import { useContext } from 'react';
import styles from "../styles/Proposals.module.css";
import { AddressContext } from "../context/AddressContext";
import { useContractRead } from "@thirdweb-dev/react";
import ProposalCard from "../components/ProposalCard";
import { ToastContainer, toast } from 'react-toastify';

const Proposals = () => {
  const {address, contract} = useContext(AddressContext);
  const { data: getProposalsData, isLoading: getProposalsIsLoading, error: getProposalsError } = useContractRead(contract,'getProposals',[], {from:address});

  return(
    <BaseLayout>
       <div className={styles.main}>
         <h1 className={styles.title}>Search through <a>the proposals</a></h1>
         <ToastContainer />
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
          {getProposalsData?.length>0?(
          <>
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
           </>
           ):
           null
          }
      </div>
    </BaseLayout>
  );
};

export default Proposals;