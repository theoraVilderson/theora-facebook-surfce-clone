import "./App.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageLoader from "./components/PageLoader";
import getUser from "./getUser";
import { UserProvider } from "./userContext";
import {
  reducer as userReducer,
  initValue as userInitValue,
  userActionTypes,
} from "./userReducer";
import { GlobalProvider } from "./globalContext";
import {
  reducer as globalReducer,
  initValue as globalInitValue,
  globalActionTypes,
} from "./globalReducer";
import { useEffect, useReducer, useState } from "react";
function App() {
  const [userData, setUserData] = useReducer(userReducer, userInitValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const [globalData, setGlobalData] = useReducer(
    globalReducer,
    globalInitValue
  );

  useEffect(() => {
    async function fetchData() {
      const uid = window.localStorage.getItem("UID");
      const user = await getUser(uid);
      if (user) setUserData({ type: userActionTypes.INIT_USER, data: user });
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const lastTheme = window.localStorage.getItem("facebook_theme");
    let isDefaultDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const currentTheme = lastTheme ?? (isDefaultDarkTheme ? "dark" : "light");
    setGlobalData({ type: globalActionTypes.TOGGLE_THEME, data: currentTheme });
  }, []);

  const goLogin = !userData?.user || !userData?.user?.phoneNumber;
  return (
    <UserProvider value={{ ...userData, setUserData }}>
      <GlobalProvider
        value={{ user: userData.user, ...globalData, setGlobalData }}
      >
        {<PageLoader loaded={isLoaded} />}
        {isLoaded && (goLogin ? <Login /> : <Home />)}
      </GlobalProvider>
    </UserProvider>
  );
}

export default App;
