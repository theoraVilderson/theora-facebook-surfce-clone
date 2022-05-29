import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import Avatar from "@mui/material/Avatar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React from "react";

function Home() {
  return (
    <>
      <Header />
      <div className="app__body flex">
        <Sidebar />
        <Feed />
        <Widget />
        <Avatar
          className=" bottom-5 right-10  cursor-pointer shadow-lg hover-overlay"
          style={{
            position: "fixed",
            backgroundColor: "var(--primary-background)",
            color: "var(--primary-text-color)",
            height: "50px",
            width: "50px",
          }}
        >
          <BorderColorIcon />
        </Avatar>
      </div>
    </>
  );
}

export default Home;
