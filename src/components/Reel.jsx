import Avatar from "@mui/material/Avatar";
import React from "react";

import "./Reel.scss";
function Reel({ userImage, poster, title, view }) {
  return (
    <div
      className="w-48 h-72 p-2 hover:scale-105 duration-150 ease-in-out flex flex-col justify-between rounded-lg text-white cursor-pointer"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        flexShrink: "0",
      }}
    >
      <Avatar
        src={userImage}
        style={{
          border: "3px solid orange",
        }}
      />
      <div>
        <h3 className="font-bold">{title}</h3>
        <h6>{view}</h6>
      </div>
    </div>
  );
}

export default Reel;
