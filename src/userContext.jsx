import { initValue } from "./userReducer";
import { createContext, useContext } from "react";
const UserContext = createContext();
export const useUserContextValue = () => useContext(UserContext);

export const UserProvider = ({ value, children }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContext;
