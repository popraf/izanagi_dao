import BaseLayout from "../components/BaseLayout";
import { useState } from "react";
import Loader from "../components/Loader";
import NewProposalStyles from "../styles/NewProposal.module.css";
import styles from "../styles/Home.module.css";
import ProposalsStyles from "../styles/Proposals.module.css";

const Proposals = () => {

  const [isLoading, setIsLoading] = useState(false);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return(
    <BaseLayout>
      <div className={ProposalsStyles.main}>
        <h1 className={ProposalsStyles.title}>Search through <a>the proposals</a></h1>
        
      </div>
    </BaseLayout>
  );
};

export default Proposals;