import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const BaseLayout = ({ children }) => {
  return (
    <main className="layout">
      <div className="navigation__wrapper">
        <Sidebar />
        <Navbar />
      </div>
      <div className="layout__main-content">
          {children}
      </div>
    </main>
  );
};

export default BaseLayout;