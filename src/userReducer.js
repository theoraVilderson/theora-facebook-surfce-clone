export const initValue = {};
export const userActionTypes = {
  INIT_USER: "initial_User",
  LOGOUT_USER: "logout_user",
};

export const reducer = (state, { type, data }) => {
  let lastRes = state;
  console.log(state, { type, data });
  switch (type) {
    case userActionTypes.INIT_USER:
      lastRes = { ...state, ...data };
      window.localStorage.setItem("UID", data.userId);
      break;
    case userActionTypes.LOGOUT_USER:
      lastRes = {};
      window.localStorage.removeItem("UID");
      break;
    default:
      break;
  }
  return lastRes;
};
