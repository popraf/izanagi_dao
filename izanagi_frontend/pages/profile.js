import BaseLayout from "../components/BaseLayout";
import withAuth from "../utils/withAuth";
import ProfileStyles from "../styles/Profile.module.css";

const Profile = () => {
  return(
    <BaseLayout>
    {/* <div className={styles.container}> */}

      <main className={ProfileStyles.main}>
        <h1 className={ProfileStyles.title}>Profile</h1>

        <h2 className={ProfileStyles.subtitle}>Contribution</h2>
          <div className={ProfileStyles.grid}>
            {/* <a className={ProfileStyles.card}> */}
              <h2>Account Status</h2>
              <p>Contributor</p>
            {/* </a> */}
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