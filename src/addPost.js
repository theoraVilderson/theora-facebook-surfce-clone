import { db } from "./firebase";

export default async function addPost(data) {
  const colRef = db.collection("Posts");
  try {
    await colRef.add(data);
  } catch (e) {
    alert("failed to add post");
  }
}
