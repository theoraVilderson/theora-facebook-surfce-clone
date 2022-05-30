import { auth } from "./firebase";
import { useUserContextValue } from "./userContext";
import { userActionTypes } from "./userReducer";
export default function LogoutUser() {
  const { setUserData } = useUserContextValue();
  if (auth().currentUser) {
    auth().signOut();
  }
  setUserData({ type: userActionTypes.LOGOUT_USER, data: {} });
}
