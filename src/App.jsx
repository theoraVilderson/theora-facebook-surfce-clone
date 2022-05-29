import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import getUser from "./getUser";
import { UserProvider } from "./userContext";
import { reducer, initValue, userActionTypes } from "./userReducer";
import { useEffect, useReducer } from "react";
function App() {
  const [userData, setUserData] = useReducer(reducer, initValue);

  useEffect(() => {
    const uid = window.localStorage.getItem("UID");
    async function fetchData() {
      console.log("before");
      const user = await getUser(uid);
      if (user) setUserData({ type: userActionTypes.INIT_USER, data: user });
    }
    fetchData();
  }, []);
  const goLogin = !userData?.user || !userData?.user?.phoneNumber;
  console.log(userData);
  return (
    <UserProvider value={{ ...userData, setUserData }}>
      {goLogin ? <Login /> : <Home />}
    </UserProvider>
  );
}

export default App;
