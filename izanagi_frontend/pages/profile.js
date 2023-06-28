import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";

const Profile = () => {
  return(
  <BaseLayout>
    <h1>Profile</h1>
    <div>
    Focuses on social impact initiatives.
    Members can propose and support projects that address environmental, social, or governance challenges.
    Funding can be allocated to support sustainable development, charitable causes, or community-driven initiatives.
    </div>
  </BaseLayout>
  );
};

export default withAuth(Profile);