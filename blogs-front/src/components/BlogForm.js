import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BlogForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const success = await addBlog({ newTitle, newAuthor, newUrl });

    if (
      newTitle.length === 0 ||
      newAuthor.length === 0 ||
      newUrl.length === 0
    ) {
      dispatch(showNotification("Title, author or url missing", "success", 5));
      return false;
    }

    const response = await dispatch(
      createBlog({ newTitle, newAuthor, newUrl })
    );

    if (response === true) {
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setFormVisible(false);
      dispatch(showNotification("New blog added", "success"), 5);
    }
    if (response.status === 401) {
      navigate("/logout");
    }

    if (typeof response === "string" && response.includes("token expired")) {
      // tokenExpiredLogout();
      // TODO
    } else {
      console.log(response);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormVisible(false);
  };

  if (formVisible) {
    return (
      <>
        <h2>Add new blog</h2>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <TextField
            label="Author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
          <TextField
            label="URL"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
          <div>
            <Button variant="contained" color="primary" type="submit">
              Save new blog
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              cancel
            </Button>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <Button
        onClick={() => setFormVisible(true)}
        name="add new blog"
        aria-labelledby="add blog"
      >
        add new blog
      </Button>
    );
  }
};
