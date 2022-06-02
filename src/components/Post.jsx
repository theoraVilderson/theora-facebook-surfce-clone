import React, { useState } from "react";
import "./Post.scss";
import Moment from "react-moment";
import Avatar from "@mui/material/Avatar";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Skeleton from "@mui/material/Skeleton";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
function Post({ title, userName, userImage, timeStamp, image }) {
  let timeStampDate =
    timeStamp instanceof Date ? timeStamp : new Date(timeStamp);
  const isNeedShoeMoment =
    +new Date() - 1000 * 60 * 60 * 24 * 7 - +timeStampDate < 0;
  const exactDate = timeStampDate.toUTCString();
  const [postImageLoader, setPostImageLoader] = useState(false);
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
                date={timeStampDate}
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
        <>
          {!postImageLoader && (
            <Skeleton
              variant="rectangle"
              width="100%"
              sx={{ height: "40vh", backgroundColor: "var(--hover-overlay)" }}
            />
          )}
          <div className="flex justify-center">
            <LazyLoadImage
              effect="opacity"
              className={`${
                !postImageLoader ? "opacity-0 absolute " : ""
              }max-w-full object-cover `}
              src={image}
              alt={title}
              afterLoad={() => setPostImageLoader(true)}
            />
          </div>
        </>
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
