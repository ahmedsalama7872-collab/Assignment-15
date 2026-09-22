import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import avatar from "../assets/default-profile.png";
import brand from "../assets/route.png";
import { NavLink,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faGears, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHomeAlt, faUserAlt } from "@fortawesome/free-regular-svg-icons";
import { Settings } from "lucide-react";
export default function NavbarCom() {
  return (
    <div className="w-full bg-white">
    <Navbar className="dark:bg-white flex mx-auto mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3 [&>div]:max-w-none [&>div]:w-full">
      <NavbarBrand >
        <img
          src={brand}
          
          className="mr-3 h-9 rounded-xl"
          alt="Flowbite React Logo"
          />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-black">
          Route Posts
        </span>
      </NavbarBrand>
      <div className="flex relative  order-1">
        <Dropdown
        className="w-52 !bg-white rounded-2xl -ms-6 px-2"
          arrowIcon={false}
          inline
          label={<div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 cursor-pointer">

          <Avatar alt="User settings" img={avatar} rounded className="w-8 h-8 object-cover " />
          <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">Ahmed Salama</span>
          <FontAwesomeIcon icon={faBars} className=" text-slate-500"/>
          </div>
        }
        >
         
          <Link to={'/profile'}><DropdownItem className="rounded-lg"><FontAwesomeIcon icon={faUserAlt} className="me-2"/> Profile</DropdownItem></Link>
          <Link to={'/settings'}><DropdownItem className="rounded-lg"><Settings className="me-2 w-4" /> Settings</DropdownItem></Link>
          <DropdownDivider />
          <DropdownItem className="text-red-600 rounded-lg hover:bg-[#FFF1F2]">Logout</DropdownItem>
        </Dropdown>
        
      </div>
      <div className="flex  min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">

      
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5] " : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900 "
        }
        >
            <FontAwesomeIcon icon={faHomeAlt} className="text-lg"/>
          <span className="hidden sm:inline">Feed</span>
        </NavLink>
        <NavLink to={"/profile"} 
         className={({ isActive }) =>
            isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5] " : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
        }>
            <FontAwesomeIcon icon={faUserAlt} className="text-lg"/>
             <span className="hidden sm:inline">Profile</span></NavLink>
        <NavLink to={"/notifications"}  className={({ isActive }) =>
            isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5] " : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
        }>
            <FontAwesomeIcon icon={faComment} className="text-lg"/>
             <span className="hidden sm:inline">Notifications</span></NavLink>
    </div>
    </Navbar>
            </div>
  );
}
