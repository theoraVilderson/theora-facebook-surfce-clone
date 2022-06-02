import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";

import ReelLoader from "./ReelLoader";
import "./Reel.scss";
function Reel({ userImage, poster, title, view }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState([]);
  const maxImageLoad = 2;
  useEffect(() => {
    if (imageLoaded.length === maxImageLoad) {
      setIsLoaded(true);
    }
  }, [imageLoaded]);
  return (
    <>
      {!isLoaded && <ReelLoader />}
      <div
        className={`${
          !isLoaded ? "opacity-0 absolute " : "relative "
        }w-48 h-72 hover:scale-105 duration-150 ease-in-out select-none  flex flex-col text-white cursor-pointer`}
        style={{
          flexShrink: "0",
        }}
      >
        <img
          src={poster}
          height="100%"
          className="-z-10 w-full h-full  absolute object-cover rounded-lg"
          onLoad={() => {
            setImageLoaded((e) => [...e, "loaded"]);
          }}
          onError={() => {
            setImageLoaded((e) => [...e, "failedLoad"]);
          }}
        />
        <div className="p-3 reel__content flex flex-col justify-between h-full ">
          <Avatar
            src={userImage}
            style={{
              border: "3px solid orange",
            }}
            onLoad={() => {
              setImageLoaded((e) => [...e, "loaded"]);
            }}
            onError={() => {
              setImageLoaded((e) => [...e, "failedLoad"]);
            }}
          />
          <div>
            <h3 className="font-bold">{title}</h3>
            <h6>{view}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reel;
