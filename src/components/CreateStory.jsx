import Avatar from "@mui/material/Avatar";
import React from "react";
import "./CreateStory.scss";
import AddIcon from "@mui/icons-material/Add";
function CreateStory() {
  return (
    <div
      className="createStory  p-3 shadow-sm rounded-lg"
      style={{ background: "var(--primary-background)" }}
    >
      <div className="flex hover-overlay cursor-pointer gap-5 p-1 rounded-lg items-center">
        <Avatar
          style={{
            color: "var(--primary-button-background)",
            backgroundColor: "var(--primary-overlay-button-background)",
          }}
        >
          <AddIcon />
        </Avatar>
        <div className="createStory__content">
          <h3 className="font-bold">Create Story</h3>
          <p style={{ color: "var(--secondary-text)" }}>
            Share Photo Or Write Something
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateStory;
