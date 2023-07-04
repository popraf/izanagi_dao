const Image = require("next/image");
const Link = require("next/link");
// const { useContext } = require("react");
// const { useRouter } = require("next/router");
const { ConnectWallet } = require("@thirdweb-dev/react");
// const { SidebarContext } = require("../context/SidebarContext");

const Navbar = () => {
  return (
    <nav className="navbar__list">

            <ul className="navbar__search">
                <Link href="/">SearchBoxTODO</Link>
            </ul>

            <div className="navbar__wallet">
                    <ConnectWallet className="customConnectButton"/>
            </div>

    </nav>
  );
};

module.exports = Navbar;
