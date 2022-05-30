import React, { useState } from "react";
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
import Settings from "./Settings";
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

function HeaderRightItem({ children, className, ...props }) {
  const divClass = classNames(
    `hover-overlay header__rightItem flex items-center justify-center w-8 h-8 p-5 rounded-full  cursor-pointer relative`,
    className
  );
  return (
    <div {...props} className={divClass}>
      {children}
    </div>
  );
}

function Header() {
  const [showSetting, setShowSetting] = useState(true);

  const handleSettings = () => {
    setShowSetting(!showSetting);
    console.log("we are here around", showSetting);
  };
  return (
    <header className="px-4 p-2 md:p-0 md:px-4 md:pt-1 flex-col static h-auto xs:sticky xs:flex-row  justify-between md:justify-stretch header flex shadow-md">
      <div className="header__left flex items-center gap-2 cursor-pointer flex-col xs:flex-row">
        <FacebookIcon />
        <div className="header__leftSearchIcon flex justify-center items-center w-8 h-8 p-5 rounded-full">
          <SearchOutlinedIcon
            sx={{ fontSize: 19 }}
            className="header__searchIcon"
          />
        </div>
      </div>
      <div
        className="header__center px-2 flex  items-end gap-2 justify-center hidden sm:flex"
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
      <div className="header__right flex flex-col xs:flex-row items-center gap-2">
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
        <HeaderRightItem onClick={handleSettings} className={showSetting&&"header__rightItem--active"}>
          <ArrowDropDownIcon />
          {showSetting && (
            <div className="absolute top-full right-0 rounded-lg shadow-2xl z-10">
              <Settings />
            </div>
          )}
        </HeaderRightItem>
      </div>
    </header>
  );
}

export default Header;
