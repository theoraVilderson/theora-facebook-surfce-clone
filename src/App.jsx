import "./App.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
import { useEffect, useReducer } from "react";
function App() {
  const [userData, setUserData] = useReducer(userReducer, userInitValue);
  const [globalData, setGlobalData] = useReducer(
    globalReducer,
    globalInitValue
  );

  useEffect(() => {
    const uid = window.localStorage.getItem("UID");
    async function fetchData() {
      const user = await getUser(uid);
      if (user) setUserData({ type: userActionTypes.INIT_USER, data: user });
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
  console.log(userData);
  return (
    <UserProvider value={{ ...userData, setUserData }}>
      <GlobalProvider
        value={{ user: userData.user, ...globalData, setGlobalData }}
      >
        {goLogin ? <Login /> : <Home />}
      </GlobalProvider>
    </UserProvider>
  );
}

export default App;
