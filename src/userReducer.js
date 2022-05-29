export const initValue = {};
export const userActionTypes = {
  INIT_USER: "initial_User",
  UPDATE_USER: "update_User",
};

export const reducer = (state, { type, data }) => {
  let lastRes = state;
  console.log(state, { type, data });
  switch (type) {
    case userActionTypes.INIT_USER:
      lastRes = { ...state, ...data };
      console.log(data);
      window.localStorage.setItem("UID", data.userId);
      break;
    default:
      break;
  }
  return lastRes;
};
