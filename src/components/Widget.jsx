import React, { useState, useEffect } from "react";
import "./Widget.scss";
import { SideBarItem } from "./Sidebar";
import AddIcon from "@mui/icons-material/Add";

function Widget() {
  return (
    <aside className="widget flex-col hidden md:flex w-1/3 lg:w-3/12 gap-3  justify-center lg:justify-start pr-2">
      <h4 className=" mx-2 mt-5  px-4 ">Group conversations</h4>
      <div>
        {/* More Btn */}
        <SideBarItem
          Icon={<AddIcon />}
          avatar={{
            style: {
              backgroundColor: "var(--secondary-button-background)",
              color: "var(--primary-text-color)",
            },
          }}
          label={"Create New Group"}
        />
      </div>
    </aside>
  );
}

export default Widget;
