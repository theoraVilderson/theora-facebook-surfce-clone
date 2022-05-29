import React from "react";
import "./Post.scss";
import Moment from "react-moment";
import Avatar from "@mui/material/Avatar";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
function Post({ title, userName, userImage, timeStamp, image }) {
  const isNeedShoeMoment =
    +new Date() - 1000 * 60 * 60 * 24 * 7 - +new Date(timeStamp) < 0;
  const exactDate = new Date(timeStamp).toUTCString();

  return (
    <div
      className="Post flex flex-col gap-3 p-3 shadow-sm rounded-lg mt-5"
      style={{ background: "var(--primary-background)" }}
    >
      <div className="flex gap-2 items-center text-xs">
        <Avatar className="cursor-pointer" src={userImage} />
        <div className="flex flex-col justify-start">
          <div className="font-bold cursor-pointer hover:underline">
            {userName}
          </div>
          <div style={{ color: "var(--secondary-text-color)" }}>
            {isNeedShoeMoment ? (
              <Moment
                date={new Date(timeStamp).toString()}
                fromNow
                interval={5000}
                title={exactDate}
              />
            ) : (
              <h4>{exactDate}</h4>
            )}
          </div>
        </div>
      </div>
      <h3>{title}</h3>
      {image && (
        <img className="max-w-full object-cover" src={image} alt={title} />
      )}
      <div className="post__footer flex flex-col sm:flex-row">
        <div className="flex flex-auto gap-2 justify-center hover-overlay cursor-pointer py-2 items-center">
          <div>Like</div>
          <div>
            <ShareOutlinedIcon />
          </div>
        </div>
        <div className="flex flex-auto gap-2 justify-center hover-overlay cursor-pointer py-2 items-center">
          <div>Comment</div>
          <div>
            <ChatBubbleOutlineOutlinedIcon />
          </div>
        </div>
        <div className="flex flex-auto gap-2 justify-center hover-overlay cursor-pointer py-2 items-center">
          <div>Share</div>
          <div>
            <ThumbUpAltOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
