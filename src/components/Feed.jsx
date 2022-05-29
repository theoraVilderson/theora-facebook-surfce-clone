import React from "react";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";
import Reels from "./Reels";
import "./Feed.scss";
import Posts from "./Posts";
function Feed() {
  return (
    <main className="w-full md:w-2/3 lg:w-6/12 pt-4 px-5">
      <Reels />
      <CreateStory />
      <CreatePost />
      <Posts />
    </main>
  );
}

export default Feed;
