import Image from "next/image";
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogout, AiOutlineWallet } from "react-icons/ai";
import { BsPeople, BsMegaphone } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaHandsHelping } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { useRouter } from "next/router";

const sidebarItems = [
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
    icon: FaHandsHelping,
  },
  {
    name: "Connect Wallet",
    href: "/connect",
    icon: AiOutlineWallet,
  },
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
  {
    name: "Logout",
    href: "/logout",
    icon: AiOutlineLogout,
  },
];

const Sidebar = () => {
  const router = useRouter();
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
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    router.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;