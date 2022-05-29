import React, { useEffect, useState } from "react";
import Post from "./Post";

import "./Posts.scss";
import { db } from "../firebase";
import getUser from "../getUser";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let firstTime = true;
    const observer = db
      .collection("Posts")
      .limit(10)
      .orderBy("timestamp", "desc")
      .onSnapshot(async (shots) => {
        const changes = shots.docChanges();
        const isModify = changes.every(
          (e) => e.type == "modified" || e.type == "removed" || firstTime
        );
        console.log(firstTime, changes, isModify, !!isModify);
        if (firstTime) firstTime = false;
        if (!isModify || !changes.length) return;
        const currentUsers = [];
        const lastRes = [];
        const nowPosts = [];
        shots.docs.forEach(async (newData) => {
          console.log("we are her2");
          const post = {};
          post.id = newData.id;
          newData = newData.data();
          post.title = newData.message;
          post.timeStamp = new Date(newData.timestamp?.toDate?.());
          post.userId = newData.userId;
          post.image = newData.imageUrl;
          let user = posts.find((e) => e.userId == newData.userId)?.user;
          currentUsers.push((user = user ?? getUser(newData.userId)));
          nowPosts.push(post);
        });
        const res = await Promise.all(currentUsers);
        res.forEach((user, key) => {
          user = user?.user ?? user;
          const post = nowPosts[key];
          post.userName = user.name;
          post.userImage = user.userImage;
          post.user = user;
          lastRes.push(post);
        });
        console.log(lastRes);
        setPosts(lastRes);
      });
    return () => {
      observer();
    };
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </div>
  );
}

export default Posts;
