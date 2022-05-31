import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import icons from "../icons/Icons";
const { FacebookIcon } = icons;

function PageLoader({ loaded = true }) {
  return (
    <Backdrop
      sx={{
        color: "var(--loader-color)",
        bgcolor: "var(--loader-background)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={!loaded}
    >
      <div className="flex flex-col items-center justify-around gap-5">
        <FacebookIcon className="w-32 h-32" />
        <h1
          className="font-bold text-3xl"
          style={{ color: "var(--loader-color)" }}
        >
          Face Book Meta
        </h1>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
}

export default PageLoader;
