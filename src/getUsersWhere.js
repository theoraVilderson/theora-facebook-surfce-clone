import { db } from "./firebase";

export default async function getUsersWhere(fields = [], limit = -1) {
  let colRef = db.collection("Users");

  for (const field of fields) {
    colRef = colRef.where(...field);
  }
  if (limit + 1) {
    colRef = colRef.limit(limit);
  }
  let users;
  try {
    users = await colRef.get();
  } catch (e) {
    alert("couldn't fetch users");
    return null;
  }
  if (users.empty) return null;
  const arrayUsers = [];
  users.forEach((e) => {
    arrayUsers.push({ userId: e.id, user: e.data() });
  });
  return arrayUsers;
}
