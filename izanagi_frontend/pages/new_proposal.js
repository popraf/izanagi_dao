import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useContext, useState } from "react";
import NewProposalStyles from "../styles/NewProposal.module.css";
import styles from "../styles/Home.module.css";
import SubmitProposal from "../utils/submitProposal";
import { AddressContext } from "../context/AddressContext";

const NewProposal = () => {
  const {address, contract} = useContext(AddressContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    initiativeAddress: '',
    description: '',
    amount: '', 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    SubmitProposal(address, contract, form.description, form.initiativeAddress, form.amount);
  }


  return(
  <BaseLayout>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Start <a>new campaign</a></h1>

        <div className={NewProposalStyles.form__container}>

          <form onSubmit={handleSubmit} className={NewProposalStyles.form_onSubmit} >
            <div className={NewProposalStyles.form__field}>
              <FormField 
                labelName="Initiative address *"
                placeholder="Enter initiative address"
                inputType="text"
                value={form.initiativeAddress}
                handleChange={(e) => handleFormFieldChange('initiativeAddress', e)}
              />
            </div>

            <FormField
                labelName="Description *"
                placeholder="Describe the initiative"
                isTextArea
                value={form.description}
                handleChange={(e) => handleFormFieldChange('description', e)}
              />

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
                title="Submit new campaign"
              />
            </div>
          </form>
        </div>

      </main>
    </div>
  </BaseLayout>
  );
};

export default withAuth(NewProposal);