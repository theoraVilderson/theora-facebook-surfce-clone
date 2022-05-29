import { db } from "./firebase";

export default async function getUsersWhere(fields = [], limit = -1) {
  let colRef = db.collection("Users");

  for (const field of fields) {
    colRef = colRef.where(...field);
  }
  if (limit + 1) {
    colRef = colRef.limit(limit);
  }
  const users = await colRef.get();
  if (users.empty) return null;

  return users.map((e) => ({ userId: e.id, user: e.data() }));
}
