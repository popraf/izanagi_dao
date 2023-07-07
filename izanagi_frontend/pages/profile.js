import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import ProfileStyles from "../styles/Profile.module.css";
import FormField from "../components/FormField";
import styles from "../styles/Home.module.css";
import NewProposalStyles from "../styles/NewProposal.module.css";
import { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import { ContractViewsContext } from "../context/ContractViewsContext";
import { useSDK } from "@thirdweb-dev/react";

const Profile = () => {
  const {userBalance,
    isStakeholder,
    isContributor,
    getStakeholderVotes
  } = useContext(ContractViewsContext);
  const [isLoading, setIsLoading] = useState(false);
  const sdk = useSDK();

  const [form, setForm] = useState({
    amount: '', 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `Sign me! (${form.amount} MATIC)`;
  }

  let userStatus;
  if (!isContributor) {
    userStatus = 'Standard';
  } else if (isContributor && isStakeholder) {
    userStatus = 'Stakeholder';
  } else if (isContributor && !isStakeholder){
    userStatus = 'Contributor';
  } else {
    userStatus = 'Error fetching the data';
  }

  return(
    <BaseLayout>

      <main className={ProfileStyles.main}>
        <h1 className={ProfileStyles.title}>Profile</h1>

          <div className={ProfileStyles.grid}>

            <div className={NewProposalStyles.form__container}>
              {/* {isLoading && <Loader />} */}
              <form onSubmit={handleSubmit} className={NewProposalStyles.form_onSubmit} >
                <h3>Contribute to the project</h3>
                <div className={NewProposalStyles.form__field/*form_fields_inline*/}>
                  <FormField 
                    labelName="Amount *"
                    placeholder="MATIC"
                    inputType="number"
                    value={form.amount}
                    handleChange={(e) => handleFormFieldChange('amount', e)}
                  />
                </div>

                <div className={NewProposalStyles.form_custom_button_div}>
                  <CustomButton 
                    btnType="submit"
                    title="Contribute"
                  />
                </div>
              </form>
            </div>

          </div>

        <h2 className={ProfileStyles.subtitle}>Account Details</h2>
          <div className={ProfileStyles.grid}>
            <a className={ProfileStyles.card}>
              <h2>Account Status</h2>
              <p>{userStatus}</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Shares</h2>
              <p>{userBalance}</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Total Votes</h2>
              <p>{getStakeholderVotes}</p>
            </a>
          </div>

        <h2 className={ProfileStyles.subtitle}>Proposals Submitted</h2>
          <div className={ProfileStyles.grid}>
            <a className={ProfileStyles.card}>
              <h2>Proposal 1</h2>
              <p>dummy Proposal 1 Description</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Proposal 2</h2>
              <p>dummy Proposal 2 Description</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Proposal 3</h2>
              <p>dummy Proposal 3 Description</p>
            </a>
          </div>

      </main>

  </BaseLayout>
  );
};

// export default withAuth(Profile);
export default (Profile);