import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "./ReelLoader.scss";
function ReelLoader() {
  return (
    <div
      className="shrink-0 flex flex-col justify-between w-48 h-72 rounded-lg p-3"
      style={{ backgroundColor: "var(--hover-overlay)" }}
    >
      <Skeleton
        variant="circular"
        sx={{
          bgcolor: "var(--hover-overlay)",
        }}
        width={40}
        height={40}
      />
      <Skeleton
        variant="text"
        sx={{
          bgcolor: "var(--hover-overlay)",
        }}
      />
    </div>
  );
}

export default ReelLoader;
