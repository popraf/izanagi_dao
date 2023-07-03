import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import NewProposalStyles from "../styles/NewProposal.module.css";
import styles from "../styles/Home.module.css";

const NewProposal = () => {

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    address: '',
    description: '',
    amount: '', 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checkIfImage(form.image, async (exists) => {
    //   if(exists) {
    //     setIsLoading(true)
    //     await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
    //     setIsLoading(false);
    //     // navigate('/');
    //   } else {
    //     alert('Provide valid image URL')
    //     setForm({ ...form, image: '' });
    //   }
    // })
  }


  return(
  <BaseLayout>
    {/* <Loader /> */}
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Start <a>new campaign</a></h1>

        <div className={NewProposalStyles.form__container}>
          {/* {isLoading && <Loader />} */}

          <form onSubmit={handleSubmit} className={NewProposalStyles.form_onSubmit} >
            <div className={NewProposalStyles.form__field}>
              <FormField 
                labelName="Initiative address *"
                placeholder="Enter initiative address"
                inputType="text"
                value={form.address}
                handleChange={(e) => handleFormFieldChange('address', e)}
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