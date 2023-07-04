import BaseLayout from "../components/BaseLayout";
import { useContext, useEffect, useState } from 'react';
import Loader from "../components/Loader";
import NewProposalStyles from "../styles/NewProposal.module.css";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Proposals.module.css";
import ProposalCard from "../components/ProposalCard";
import { ProposalContext } from "../context/ProposalContext";
import { ToastContainer, toast } from 'react-toastify';

const Proposals = () => {

  const [isLoading, setIsLoading] = useState(false);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const [proposals, setProposals] = useState(null)
  const [proposalInput, setProposalInput] = useState('')
  const [dummyData] = useState([{
    proposer: "0xA35991d95111a4e6172d720eB92B718C2BD04B78",
    votes: [{ type: 0, label: 'Against', count: 30443 },
    { type: 1, label: 'For', count: 43232 },
    { type: 2, label: 'Abstain', count: 3432 }],
    state: 1,
    description: "This is a Dummy proposal!"
  }])

  // const {
  //   getAllProposals,
  //   isExecutable,
  //   currentUserAddress,
  //   createProposal,

  // } = useContext(ProposalContext)

  // useEffect(() => {
  //   getAllProposals()
  //     .then(proposals => {
  //       if (proposals.length) {
  //         setProposals(proposals.reverse())
  //         console.log(proposals)

  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])


  return(
    <BaseLayout>
      <div className={styles.main}>
        <h1 className={styles.title}>Search through <a>the proposals</a></h1>
        
          <div className={styles.wrapper}>
            <div className={styles.proposals}>
                {dummyData &&
                  dummyData.map(data => {
                    return (
                      <ProposalCard key={Math.random()} data={data} />
                    )
                  })}
            </div>
          </div>

      </div>
    </BaseLayout>
  );
};

export default Proposals;