import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const BaseLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main-content">
          <Navbar />
          {children}
      </main>
    </div>
  );
};

export default BaseLayout;