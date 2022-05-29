import { db } from "./firebase";

export default async function addPost(data) {
  const colRef = db.collection("Posts");
  await colRef.add(data);
  console.log("post has added", data);
}
