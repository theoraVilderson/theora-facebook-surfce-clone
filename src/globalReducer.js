import logoutUser from "./logoutUser";
export const initValue = {};
export const globalActionTypes = {
  TOGGLE_THEME: "initial_User",
  LOGOUT_USER: "logout_user",
};

export const reducer = (state, { type, data }) => {
  let lastRes = state;
  switch (type) {
    case globalActionTypes.TOGGLE_THEME:
      lastRes = { ...state, theme: data };
      window.localStorage.setItem("facebook_theme", data);
      document.body.classList.toggle("dark", data === "dark");
      document.body.classList.toggle("light", data === "light");
      break;
    case globalActionTypes.LOGOUT_USER:
      logoutUser();
      break;
    default:
      break;
  }
  return lastRes;
};
