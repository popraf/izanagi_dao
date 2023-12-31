import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import ProfileStyles from "../styles/Profile.module.css";
import FormField from "../components/FormField";
import styles from "../styles/Home.module.css";
import NewProposalStyles from "../styles/NewProposal.module.css";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { ContractViewsContext } from "../context/ContractViewsContext";
import { useSDK, useContractRead } from "@thirdweb-dev/react";
import buyShares from "../utils/buyShares";
import { AddressContext } from "../context/AddressContext";
import ProposalCard from "../components/ProposalCard";

const Profile = () => {
  const {userBalance,
    isStakeholder,
    isContributor,
    userStatus
  } = useContext(ContractViewsContext);
  const {address, contract} = useContext(AddressContext);

  const [form, setForm] = useState({
    amount: '', 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    buyShares(address, contract, form.amount);
  }

  // // getStakeholderVotes view:
  let getStakeholderVotes = 'You are not a stakeholder. Contribution of at least 5 MATIC enables voting.';
  const { data: getStakeholderVotesData, isLoading: getStakeholderVotesIsLoading, error: getStakeholderVotesError } = useContractRead(contract,'getStakeholderVotes',[], {from:address, blockTag: "latest"});
  const { data: getProposalsData, isLoading: getProposalsIsLoading, error: getProposalsError } = useContractRead(contract,'getProposals',[], {from:address, blockTag: "latest"}/*, {cacheOnBlock: true}, {staleTime: 10_000} - this is unsupported by Thirdweb lib, however available in wagmi*/);

  if (address && isStakeholder == true) {
    if (getStakeholderVotesIsLoading) {
      getStakeholderVotes = 'Loading...';
    } else {
      if (getStakeholderVotesError) {
        if (getStakeholderVotesError.reason == "User is not a stakeholder") {
          getStakeholderVotes = "You are not a stakeholder. Contribution of at least 5 MATIC enables voting."
        } else {
          getStakeholderVotes = 'Error fetching getStakeholderVotes';
        }
      } else if (getStakeholderVotesData == null) {
        getStakeholderVotes = 'You are not a stakeholder. Contribution of at least 5 MATIC enables voting.';
      } else {
        getStakeholderVotes = getStakeholderVotesData.length;
      }
    }
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
          <div>
            <div>
            {
                (!getProposalsIsLoading && 
                getProposalsData.length>0 &&
                getProposalsData.some(data => data.proposer == address))?
                getProposalsData.map(
                  data => data.proposer == address?
                    <ProposalCard key={Math.random()} proposal={data} />
                    :null
                ):
                <h2>No submitted proposals yet</h2>
              }
            </div>
          </div>

      </main>

  </BaseLayout>
  );
};

export default withAuth(Profile);
