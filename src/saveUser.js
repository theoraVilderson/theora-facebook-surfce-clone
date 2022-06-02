import { db } from "./firebase";
import getUser from "./getUser";

export default async function setUser(data, uid = null) {
  const colRef = db.collection("Users");
  const userRef = colRef.doc(uid);
  try {
    await userRef.set(data, { merge: true });
  } catch (e) {
    alert("couldn't update user data");
    return {};
  }
  return await getUser(uid);
}
