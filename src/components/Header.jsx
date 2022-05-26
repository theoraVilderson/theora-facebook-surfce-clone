import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import icons from "../icons/Icons";
import classNames from "classnames";
import "./Header.scss";
const { FacebookIcon } = icons;

function HeaderCenterItem({ title, active, children, ...props }) {
  const divClass = classNames(
    `header__centerItem flex items-center justify-center h-12 cursor-pointer ${
      active ? " header__centerItem--active" : " hover-overlay"
    }`,
    props?.className
  );
  return (
    <div {...props} className={divClass}>
      {children}
    </div>
  );
}

function HeaderRightItem({ children }) {
  return (
    <div className="hover-overlay header__rightItem flex items-center justify-center w-8 h-8 p-5 rounded-full  cursor-pointer ">
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="px-4 p-2 md:p-0 md:px-4 md:pt-1  justify-between md:justify-stretch header flex ">
      <div className="header__left flex items-center gap-2 cursor-pointer">
        <FacebookIcon />
        <div className="header__leftSearchIcon flex justify-center items-center w-8 h-8 p-5 rounded-full">
          <SearchOutlinedIcon
            sx={{ fontSize: 19 }}
            className="header__searchIcon"
          />
        </div>
      </div>
      <div
        className="header__center px-2 flex items-center gap-2 justify-center hidden md:flex"
        style={{ flexGrow: 1 }}
      >
        <HeaderCenterItem title="Home" active>
          <HomeIcon />
        </HeaderCenterItem>
        <HeaderCenterItem title="Friends">
          <PeopleOutlineIcon />
        </HeaderCenterItem>
        <HeaderCenterItem title="Groups">
          <GroupsOutlinedIcon />
        </HeaderCenterItem>
        <HeaderCenterItem title="Menu" className="lg:hidden">
          <MenuIcon />
        </HeaderCenterItem>
      </div>
      <div className="header__right flex items-center gap-2">
        <HeaderRightItem>
          <span className="hidden lg:flex">
            <ViewComfyIcon />
          </span>
          <span className="flex lg:hidden">
            <AddIcon />
          </span>
        </HeaderRightItem>
        <HeaderRightItem>
          <ChatOutlinedIcon />
        </HeaderRightItem>
        <HeaderRightItem>
          <NotificationsIcon />
        </HeaderRightItem>
        <HeaderRightItem>
          <ArrowDropDownIcon />
        </HeaderRightItem>
      </div>
    </header>
  );
}

export default Header;
