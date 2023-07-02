import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import NewProposalStyles from "../styles/NewProposal.module.css";

const NewProposal = () => {

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        // navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }


  return(
  <BaseLayout>
    {/* <Loader /> */}
    <div className={NewProposalStyles.form__container}>
      {/* {isLoading && <Loader />} */}
      <div className={NewProposalStyles.form_div_h1}>
        <h1 className={NewProposalStyles.form_h1}>
          Start a Campaign
          </h1>
      </div>

      <form onSubmit={handleSubmit}
        className={NewProposalStyles.form_onSubmit}
      >
        <div className={NewProposalStyles.form__field}>
          <FormField 
            labelName="Your Name *"
            placeholder="Matt Damon"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className={NewProposalStyles.form_fields}>
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className={NewProposalStyles.form_custom_button_div}>
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
            />
          </div>
      </form>
    </div>  
  </BaseLayout>
  );
};

export default withAuth(NewProposal);