import BaseLayout from "../components/BaseLayout";
import styles from "../styles/Home.module.css";

const About = () => {
  return(
  <BaseLayout>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          About <a>the project</a>
        </h1>

        <p className={styles.description}>
          Members of Izanagi DAO have the opportunity to propose projects that aim to create positive change in society.
          <br/>
          Learn more about decentralized nature of the project, enabling
          individuals to work towards common social objectives.
        </p>

        <h2>Details</h2>
        <div className={styles.grid_text}>
            Izanagi DAO focuses on social impact initiatives by providing a platform for 
            its members to propose and support projects that address various environmental, 
            social, or governance challenges. The DAO (Decentralized Autonomous Organization)
            model allows for decentralized decision-making and resource allocation.

            Members of Izanagi DAO have the opportunity to propose projects that aim to
            create positive change in society. These projects can span a wide range of areas,
            such as environmental conservation, social equality, community development,
            education, healthcare, and more. The DAO fosters a collaborative and participatory
            environment where members can contribute their ideas and expertise to drive
            meaningful impact.

            Once a project proposal is submitted, the members of Izanagi DAO have the ability
            to support and vote on the project's funding allocation. This democratic process
            ensures that projects align with the collective vision and goals of the DAO's
            community. Funding can be allocated to support sustainable development initiatives,
            charitable causes, or community-driven projects that aim to uplift marginalized
            communities.

            By leveraging blockchain technology and smart contracts, Izanagi DAO 
            provides transparency and accountability in project funding and execution. 
            The decentralized nature of the DAO enables individuals from diverse backgrounds 
            to come together and work towards common social objectives.

            Through its focus on social impact initiatives, Izanagi DAO strives to create a
            positive and sustainable future, where individuals and communities can thrive. 
            By empowering its members to propose and support projects that address pressing 
            societal challenges, Izanagi DAO aims to make a tangible difference and 
            contribute to the betterment of society as a whole.
        </div>

      <h2>Proposals</h2>
        <div className={styles.grid_text}>
            The "Proposals" feature of Izanagi DAO allows members to submit their project
            ideas and initiatives for consideration and funding. It serves as a collaborative
            platform where individuals can present innovative proposals that align with the
            DAO's mission of driving positive social impact.

            Members are encouraged to submit proposals that address environmental, social, or
            governance challenges and have the potential to create meaningful change.
            These proposals can cover a wide range of areas, such as sustainable development,
            community empowerment, social equality, education, healthcare, and more.

            Once a proposal is submitted, it undergoes a transparent evaluation process within
            the DAO community. Members have the opportunity to review and provide feedback on
            the proposal, fostering an environment of collaboration and constructive dialogue.

            The proposals that receive sufficient support and consensus from the DAO community
            are then eligible for funding. The DAO members vote to allocate resources and 
            financial support to the selected projects, enabling them to come to fruition.

            Through its "Proposals" feature, Izanagi DAO empowers its members to contribute
            their ideas and expertise, fostering a collective effort to address pressing
            societal challenges. It exemplifies the DAO's commitment to promoting social
            innovation and creating a positive impact on communities and the world at large.
        </div>

      </main>
    </div>

  </BaseLayout>
  );
};

export default About;