import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { useContext } from "react";
import { useNotifications } from "./NotificationContext.jsx";
import { UserContext } from "./UserContext.jsx";
import avatar from "../assets/default-profile.png";
import brand from "../assets/route.png";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Settings,MessageCircle,User,House } from "lucide-react";

export default function NavbarCom() {
  const { counter, getNotCount } = useNotifications();
  const {user} = useContext(UserContext)
  return (
    <div className="w-full sticky top-0 z-50 bg-white">
      <Navbar className="dark:bg-white  flex mx-auto max-w-7xl items-center justify-between gap-2 px-4 py-1.5 sm:gap-3 sm:px-0 [&>div]:max-w-none [&>div]:w-full">
        <NavbarBrand>
          <img
            src={brand}
            className="mr-3 h-9 rounded-xl"
            alt="Route Posts Logo"
          />
          <span className="hidden sm:block self-center whitespace-nowrap text-xl font-bold dark:text-black">
            Route Posts
          </span>
        </NavbarBrand>

        <div className="flex relative order-1">
          <Dropdown
            className="w-52 z-50 absolute !bg-white rounded-2xl -ms-6 px-2"
            arrowIcon={false}
            inline
            label={
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 transition hover:bg-slate-100 cursor-pointer">
                <Avatar size="sm" alt="User settings" img={avatar} rounded className="rounded-full object-cover" />
                <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">{user?.name}</span>
                <FontAwesomeIcon icon={faBars} className="text-slate-500" />
              </div>
            }
          >
            {/* تم تصحيح المسار هنا ليطابق /app/profile */}
            <Link to={'/app/profile'}><DropdownItem className="rounded-lg"><User className="w-5 h-5 me-2" /> Profile</DropdownItem></Link>
            
            {/* تم تصحيح المسار هنا ليطابق /app/settings */}
            <Link to={'/app/settings'}><DropdownItem className="rounded-lg"><Settings className="me-2 w-5 h-5" /> Settings</DropdownItem></Link>
            
            <DropdownDivider />
            <DropdownItem className="text-red-600 rounded-lg hover:bg-[#FFF1F2]">Logout</DropdownItem>
          </Dropdown>
        </div>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to={"/app/feed"}
            className={({ isActive }) =>
              isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5]" : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
            }
          >
            <House className="text-lg w-5 h-5" />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink 
            to={"/profile"} 
            className={({ isActive }) =>
              isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5]" : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
            }
          >
            <User className="text-lg w-5 h-5" />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>

          <NavLink 
            to={"/notifications"}  
            className={({ isActive }) =>
              isActive ? "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5]" : "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
            }
          >
            <div className="relative">

            <MessageCircle className="text-lg w-5 h-5 " />
            <span className="absolute -right-2 -top-2 inline-flex min-w-[16px] items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-black leading-4 text-white">{counter}</span>
            </div>
            <span className="hidden sm:inline">Notifications</span>
          </NavLink>
        </div>
      </Navbar>
    </div>
  );
}