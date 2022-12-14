import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { AddComment } from "../components/AddComment";
import { Comments } from "./Comments";

import { deleteBlog, like, selectBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

export const Blog = () => {
  const [commentVisible, setCommentVisible] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const blogToDisplay = useSelector(selectBlog(params.id));

  if (!blogToDisplay) {
    return null;
  }
  const handleDelete = (blog) => {
    const result = dispatch(deleteBlog(blog));
    if (result) {
      dispatch(showNotification("Blog deleted", "info", 5));
      navigate("/");
    } else if (typeof result === "string") {
      if (result.response.data.error.includes("token expired")) {
        // TODO: Logout when token expired
        // tokenExpiredLogout();
      }
    }
    console.log(result);
  };

  return (
    <>
      <h2>
        {blogToDisplay.title} by {blogToDisplay.author}{" "}
        {currentUser.username === blogToDisplay.user.username && (
          <Button
            variant="contained"
            onClick={() => {
              handleDelete(blogToDisplay);
            }}
            name="delete"
            aria-labelledby="delete"
          >
            {" "}
            delete
          </Button>
        )}
      </h2>
      <p>
        <a href={blogToDisplay.url} target="_blank" rel="noreferrer">
          {blogToDisplay.url}
        </a>
      </p>
      <p>
        {blogToDisplay.likes} likes{" "}
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(like(blogToDisplay));
            dispatch(showNotification("liked", "success", 5));
          }}
          name="like"
          aria-labelledby="like"
        >
          like
        </Button>
      </p>

      {!commentVisible && (
        <>
          <Comments blog={blogToDisplay} />
          <Button
            onClick={() => {
              setCommentVisible(!commentVisible);
            }}
          >
            Add a comment
          </Button>
        </>
      )}
      {commentVisible && (
        <AddComment
          blog={blogToDisplay}
          hideCommentForm={() => setCommentVisible(false)}
        />
      )}
      <p>
        Added by {blogToDisplay.user.name} ({blogToDisplay.user.username})
      </p>
    </>
  );
};
