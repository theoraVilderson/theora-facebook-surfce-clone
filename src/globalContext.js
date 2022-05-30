import { createContext, useContext } from "react";
const GlobalContext = createContext();
export const useGlobalContextValue = () => useContext(GlobalContext);

export const GlobalProvider = ({ value, children }) => {
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
export default GlobalContext;
