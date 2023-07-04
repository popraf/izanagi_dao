import Sidebar from "./Sidebar";
const { ConnectWallet } = require("@thirdweb-dev/react");

const BaseLayout = ({ children }) => {
  return (
    <div className="layout">
        <Sidebar />
      <main className="layout__main-content">
          {children}
      </main>
    </div>
  );
};

export default BaseLayout;