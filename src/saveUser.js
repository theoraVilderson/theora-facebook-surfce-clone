import { db } from "./firebase";
import getUser from "./getUser";

export default async function setUser(data, uid = null) {
  const colRef = db.collection("Users");
  const userRef = colRef.doc(uid);
  console.log("before we set");
  await userRef.set(data, { merge: true });
  console.log("after we set");
  return await getUser(uid);
}
