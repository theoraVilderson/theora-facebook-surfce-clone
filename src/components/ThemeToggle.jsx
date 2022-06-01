import React from "react";
import { useGlobalContextValue } from "../globalContext";
import { globalActionTypes } from "../globalReducer";
import "./ThemeToggle.scss";
export function useThemeHandler() {
  const { theme, setGlobalData } = useGlobalContextValue();
  const isLight = theme === "light";
  const onToggleTheme = (toggle = isLight ? "dark" : "light") => {
    toggle = typeof toggle === "string" ? toggle : isLight ? "dark" : "light";
    setGlobalData({
      type: globalActionTypes.TOGGLE_THEME,
      data: toggle,
    });
  };
  return [theme, onToggleTheme];
}
function ThemeToggle({ isLight, ...rest }) {
  return (
    <div {...rest} className="relative">
      <div className={"themeToggle"}>
        <button
          className={
            "themeToggle__toggler" + (!isLight ? " themeToggle--active" : "")
          }
        >
          <div className="themeToggle__toggleBar">
            <i className={"glyphicon glyphicon-sunf glyphicon-moon"}></i>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;
