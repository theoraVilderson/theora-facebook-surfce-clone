import React from "react";
import "./Settings.scss";
import { SideBarItem, SideBarFooter } from "./Sidebar";
import { useUserContextValue } from "../userContext";

import { auth } from "../firebase";
import { userActionTypes } from "../userReducer";

import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";

import ThemeToggle, { useThemeHandler } from "./ThemeToggle";

function Settings() {
  const {
    user: { name: userName, userImage },
    setUserData,
  } = useUserContextValue();
  const [theme, onChangeTheme] = useThemeHandler();
  console.log(theme, onChangeTheme);
  const isLight = theme === "light";
  const onLogOut = () => {
    if (auth.currentUser) {
      auth.signOut();
    }
    setUserData({ type: userActionTypes.LOGOUT_USER, data: {} });
  };
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ cursor: "auto" }}>
      <div
        className="flex flex-col overflow-auto  translate-x-[42%] xs:translate-x-0"
        style={{
          height: "410.25px",
          maxHeight: "calc(100vh - 60px)",
          width: "360px",
          maxWidth: "calc(100vw - 24px)",
          backgroundColor: "var(--primary-background)",
        }}
      >
        <SideBarItem
          className="setting__userProfile flex flex-col xs:flex-row"
          userImage={userImage}
          label={
            <>
              ({userName})
              <h2
                className="font-thin"
                style={{ color: "var(--secondary-text)" }}
              >
                Your profile
              </h2>
            </>
          }
        />
        <div className="mt-2">
          <SideBarItem
            onClick={onChangeTheme}
            className="setting__theme relative"
            Icon={<NightlightIcon />}
            avatar={{
              style: {
                backgroundColor: "var(--secondary-button-background)",
                color: "var(--primary-text-color)",
              },
            }}
            label={
              <>
                <h2
                  className="font-thin hidden xs:block"
                  style={{ color: "var(--secondary-text)" }}
                >
                  Theme : ({theme})
                </h2>
                <div className="absolute top-1/2 -translate-y-1/2 right-2">
                  <ThemeToggle isLight={isLight} />
                </div>
              </>
            }
          />
          <SideBarItem
            onClick={onLogOut}
            className="setting__theme relative"
            Icon={<LogoutIcon />}
            avatar={{
              style: {
                backgroundColor: "var(--secondary-button-background)",
                color: "var(--primary-text-color)",
              },
            }}
            label={
              <>
                <h2
                  className="font-thin hidden xs:block"
                  style={{ color: "var(--secondary-text)" }}
                >
                  LogOut
                </h2>
              </>
            }
          />
        </div>
        <div className="flex-1 flex items-end">
          <SideBarFooter />
        </div>
      </div>
    </div>
  );
}

export default Settings;
