import { db } from "./firebase";

export default async function getUser(
  uid = window?.localStorage.getItem("UID")
) {
  const colRef = db.collection("Users");
  if (typeof uid != "string") return null;
  const userRef = colRef.doc(uid);
  let user;
  try {
    user = await userRef.get();
  } catch (e) {
    alert("couldn't fetch user");
    return null;
  }
  if (!user.exists) return null;

  return {
    userId: uid,
    user: user.data(),
  };
}
