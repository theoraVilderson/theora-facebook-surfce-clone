import { db } from "./firebase";

export default async function getUser(
  uid = window?.localStorage.getItem("UID")
) {
  const colRef = db.collection("Users");
  if (typeof uid != "string") return null;
  const userRef = colRef.doc(uid);
  const user = await userRef.get();
  if (!user.exists) return null;

  return {
    userId: uid,
    user: user.data(),
  };
}
