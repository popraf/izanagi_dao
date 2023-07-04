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

<table className={ProposalsStyles.table__container}>
        {/* <table className={ProposalsStyles.table}> */}
{/* <div className={ProposalsStyles.table__header}> */}
          <thead className={ProposalsStyles.table__header}>
            <tr className={ProposalsStyles.table__tr}>
              <th> Id</th>
              <th> Voting End Date </th>
              <th> Description </th>
              <th> Amount </th>
              <th> Proposed Address </th>
              <th> Initiative Address </th>
              <th> Upvotes </th>
              <th> Downvotes </th>
            </tr>
          </thead>
{/* </div> */}
          <tbody className={ProposalsStyles.tbody}>
            <tr className={ProposalsStyles.table__tr}>
              <td> 1 </td>
              <td> 17 Dec, 2022 </td>
              <td> This initiative... </td>
              <td> 200MATIC </td>
              <td> 0x0000 </td>
              <td> 0x1000 </td>
              <td> 20 </td>
              <td> 5 </td>
            </tr>
          </tbody>

        </table>
{/* </div> */}

      </div>
    </BaseLayout>
  );
};

export default Proposals;