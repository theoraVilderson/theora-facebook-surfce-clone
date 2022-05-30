import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import icons from "../icons/Icons";
import { useUserContextValue } from "../userContext";
import classNames from "classnames";
import "./Sidebar.scss";

export function SideBarItem({
  userImage,
  label,
  avatar,
  Icon,
  className,
  ...props
}) {
  const itemClass = classNames(
    "sidebar__item hover-overlay flex gap-5 items-center py-[4px] mx-2 rounded-lg px-3 cursor-pointer font-bold",
    className
  );

  return (
    <div className={itemClass} {...props}>
      <Avatar src={userImage} {...avatar} className="avatar">
        {Icon}
      </Avatar>
      <div className="sidebar__userName">{label}</div>
    </div>
  );
}

function SideBarFooterLink({ children }) {
  return (
    <a href="/" className="sidebar__footer__link hover:underline">
      {children}
    </a>
  );
}

export function SideBarFooter() {
  return (
    <div className="sidebar__footer break-words px-5 py-2">
      <SideBarFooterLink>Privacy</SideBarFooterLink>
      {" . "}
      <SideBarFooterLink>Terms</SideBarFooterLink>
      {" . "}
      <SideBarFooterLink>Advertising</SideBarFooterLink>
      {" . "}
      <SideBarFooterLink>Ad&nbsp;Choices</SideBarFooterLink>
      {" . "}
      <SideBarFooterLink>Cookies</SideBarFooterLink>
      {" . "}
      <span> More . </span>
      <span> Meta © 2022 </span>
    </div>
  );
}

function Sidebar({ show = false }) {
  const {
    user: { name: userName, userImage },
  } = useUserContextValue();

  const allSections = [
    { iconName: "FindFriendsImage", link: "/", title: "Find Friends" },
    { iconName: "FacebookImage", link: "/", title: "Welcome" },
    { iconName: "GroupsImage", link: "/", title: "Groups" },
    { iconName: "MarketplaceImage", link: "/", title: "Marketplace" },
    { iconName: "WatchImage", link: "/", title: "Watch" },
    { iconName: "MemoriesImage", link: "/", title: "Memories" },
    { iconName: "SavedImage", link: "/", title: "Saved" },
    { iconName: "PagesImage", link: "/", title: "Pages" },
    { iconName: "EventsImage", link: "/", title: "Events" },
    { iconName: "MostRecentImage", link: "/", title: "Most Recent" },
    { iconName: "AdCenterImage", link: "/", title: "Ad Center" },
    { iconName: "AdsManagerImage", link: "/", title: "Ads Manager" },
    { iconName: "CommunityHelpImage", link: "/", title: "Community Help" },
    {
      iconName: "COVID19InformationCenterImage",
      link: "/",
      title: "COVID-19 Information Center",
    },
    { iconName: "EmotionalHealthImage", link: "/", title: "Emotional Health" },
    { iconName: "FavoritesImage", link: "/", title: "Favorites" },
    { iconName: "FundraisersImage", link: "/", title: "Fundraisers" },
    { iconName: "GamingVideoImage", link: "/", title: "Gaming Video" },
    { iconName: "LiveVideosImage", link: "/", title: "Live Videos" },
    { iconName: "MessengerImage", link: "/", title: "Messenger" },
    { iconName: "PlayGamesImage", link: "/", title: "Play Games" },
    {
      iconName: "RecentAdActivityImage",
      link: "/",
      title: "Recent Ad Activity",
    },
    { iconName: "WeatherImage", link: "/", title: "Weather" },
  ];
  const [showMore, setShowMore] = useState(false);
  const goToLink = (link) => {
    return () => {
      window.open(link, "_blank");
    };
  };
  return (
    <aside
      className={`sidebar ${
        show ? "flex" : "hidden"
      } lg:flex w-3/12  flex-col  text-sm `}
    >
      {/* User */}
      <SideBarItem userImage={userImage} label={userName} />
      {/* Sections */}
      {allSections
        .filter((e, k) => showMore || k < 10)
        .map((e) => {
          return (
            <SideBarItem
              key={e.title}
              userImage={icons[e.iconName]().props.src}
              label={e.title}
              onClick={goToLink(e.link)}
            />
          );
        })}
      {/* More Btn */}
      <SideBarItem
        Icon={showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        avatar={{
          style: {
            backgroundColor: "var(--secondary-button-background)",
            color: "var(--primary-text-color)",
          },
        }}
        label={showMore ? "See Less" : "See More"}
        onClick={() => setShowMore((showMore) => !showMore)}
      />
      {/* SideBarFooter */}
      <SideBarFooter />
    </aside>
  );
}

export default Sidebar;
