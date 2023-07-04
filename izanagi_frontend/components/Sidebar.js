import { useAddress } from "@thirdweb-dev/react";
import Link from 'next/link'
const Image = require("next/image");
const { AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogout, AiOutlineWallet } = require("react-icons/ai");
const { BsPeople, BsMegaphone, BsBoxes } = require("react-icons/bs");
const { TiContacts } = require("react-icons/ti");
const { FiMail } = require("react-icons/fi");
const { CgProfile } = require("react-icons/cg");
const { FaHandsHelping } = require("react-icons/fa");
const { MdKeyboardArrowLeft, MdKeyboardArrowRight } = require("react-icons/md");
const { useContext } = require("react");
const { SidebarContext } = require("../context/SidebarContext");
const { useRouter } = require("next/router");

const sidebarItemsAll = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "About",
    href: "/about",
    icon: AiOutlineInfoCircle,
  },
  {
    name: "Proposals",
    href: "/proposals",
    icon: BsBoxes,
  },
];

const sidebarItemsLogged = [
  {
    name: "New Proposal",
    href: "/new_proposal",
    icon: BsMegaphone,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: CgProfile,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const address = useAddress();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            className="sidebar__logo"
            src="/thirdweb.svg"
            alt="logo"
          />
          <p className="sidebar__logo-name">Izanagi DAO</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItemsAll.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link href={href}>
                  <span className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""}`}>
                    <span className="sidebar__icon">
                      <Icon />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </span>
                </Link>
              </li>
            );
          })}
          {address?(sidebarItemsLogged.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link href={href}>
                  <span className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""}`}>
                    <span className="sidebar__icon">
                      <Icon />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </span>
                </Link>
              </li>
            );
          }))
          :""
          }
        </ul>
      </aside>
    </div>
  );
};

module.exports = Sidebar;
