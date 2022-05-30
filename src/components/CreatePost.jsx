import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useUserContextValue } from "../userContext";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import addPost from "../addPost";
import "./CreatePost.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  minHeight: "250px",
  width: "40%",
  height: "40vh",
  bgcolor: "var(--primary-background)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function CreatePost() {
  const {
    userId,
    user: { name: userName, userImage },
  } = useUserContextValue();
  const [postTitle, setPostTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [imgURL, setImageURl] = useState("");
  const validate = () => {
    if (!imgURL) return {};
    // validating url
    try {
      // on success
      new URL(imgURL);
      if (!new URL(imgURL).hostname) throw "bad url";
      return {};
    } catch (e) {
      //on bad url
      return {
        error: true,
        helperText: "please put valid URL",
      };
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (validate().error) setImageURl("");
    setOpen(false);
  };
  const handlePaste = async () => {
    let data;
    try {
      data = await navigator.clipboard.readText();
    } catch (e) {
      alert(e);
      return;
    }
    setImageURl(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postTitle.trim()) return alert("please at least write somthing");
    const lastRes = {
      message: postTitle,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId,
    };
    if (imgURL) lastRes.imageUrl = imgURL;
    addPost(lastRes);
    setPostTitle("");
    setImageURl("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="createPost flex flex-col gap-3 p-3 shadow-sm rounded-lg mt-5"
      style={{ background: "var(--primary-background)" }}
    >
      <div className="flex gap-5">
        <Avatar className="cursor-pointer" src={userImage}></Avatar>
        <input
          className="rounded-full w-full px-4 cursor-pointer hover-overlay"
          type="text"
          style={{ backgroundColor: "var(--secondary-icon-background)" }}
          placeholder={`What's on Your Mind ${userName}?`}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </div>
      <div
        className="flex flex-col sm:flex-row p-3"
        style={{ borderTop: "solid 1px var(--secondary-button-background)" }}
      >
        <div className="flex-auto hover-overlay cursor-pointer p-2 justify-center flex gap-1 rounded-lg">
          <VideoCameraFrontIcon sx={{ color: "#f3425f" }} /> Live Video
        </div>
        <div className="flex-auto hover-overlay cursor-pointer p-2 justify-center flex gap-1 rounded-lg">
          <div
            className=" justify-center flex items-center"
            onClick={handleOpen}
          >
            <AddPhotoAlternateIcon sx={{ color: "#45bd62" }} /> Photo/Video
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className="min-h-[50vh]"
          >
            <Box sx={{ ...style }}>
              <div className="flex flex-col justify-between h-full">
                <h2 id="child-modal-title" className="py-2 my-3">
                  Image URL
                </h2>
                <div className="flex items-center gap-2">
                  <TextField
                    id="outlined-helperText"
                    label="Put Image URL Here"
                    className="w-full p-2 imageURLFiled"
                    value={imgURL}
                    onInput={(e) => setImageURl(e.target.value)}
                    onBlur={(e) => setImageURl(e.target.value)}
                    {...validate()}
                  />
                  <Button onClick={handlePaste}>
                    <ContentPasteOutlinedIcon />
                  </Button>
                </div>
                <Button onClick={handleClose} className="w-20 self-end">
                  Done
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="flex-auto hover-overlay cursor-pointer p-2 justify-center flex gap-1 rounded-lg">
          <AddPhotoAlternateIcon sx={{ color: "#f7b928" }} /> Feeling/Activity
        </div>
      </div>
      <div className="submit flex ">
        <Button
          className="flex flex-1"
          disabled={!!!postTitle.trim()}
          variant="contained"
          color="error"
          type="submit"
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
    </form>
  );
}

export default CreatePost;
