import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import ProfileStyles from "../styles/Profile.module.css";
import FormField from "../components/FormField";
import styles from "../styles/Home.module.css";
import NewProposalStyles from "../styles/NewProposal.module.css";
import { useState } from "react";
import CustomButton from "../components/CustomButton";

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    amount: '', 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleSubmitStakeholder = async (e) => {
    e.preventDefault();
  }

  return(
    <BaseLayout>
    {/* <div className={styles.container}> */}

      <main className={ProfileStyles.main}>
        <h1 className={ProfileStyles.title}>Profile</h1>

        {/* <h2 className={ProfileStyles.subtitle}>Contribution to the project</h2> */}
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
              <p>Contributor</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Balance</h2>
              <p>123 MATIC</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Total Votes</h2>
              <p>Account is not stakeholder.</p>
              <p> Contribute at least 5 MATIC to become one.</p>
            </a>
          </div>

        <h2 className={ProfileStyles.subtitle}>Proposals Submitted</h2>
          <div className={ProfileStyles.grid}>
            <a className={ProfileStyles.card}>
              <h2>Proposal 1</h2>
              <p>Proposal 1 Description</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Proposal 2</h2>
              <p>Proposal 2 Description</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Proposal 3</h2>
              <p>Proposal 3 Description</p>
            </a>
          </div>

        <h2 className={ProfileStyles.subtitle}>Manage Submitted Proposals</h2>
          <div className={ProfileStyles.grid}>
            <a className={ProfileStyles.card}>
              <h2>Withdraw</h2>
              <p>Proposal 1 Description</p>
            </a>

            <a className={ProfileStyles.card}>
              <h2>Proposal 3</h2>
              <p>Proposal 3 Description</p>
            </a>
          </div>

        <h3>User Details</h3>
          <div>
            <h5>known statuses, functions</h5>
            <p>Status/is stakeholder, is contributor</p>
            <p>Total contributed</p>
            <p>Become stakeholder</p>
            <p>Get stakeholder votes</p>
            <p>Get stakeholder balance, get contributor balance</p>
            <p>User proposals</p>
          </div>

      </main>

    {/* </div> */}

  </BaseLayout>
  );
};

// export default withAuth(Profile);
export default (Profile);