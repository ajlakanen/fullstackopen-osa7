/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { like, selectBlog } from "../reducers/blogReducer";

export const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const blogToDisplay = useSelector(
  //   (state) => state.blogs.filter((b) => b.id === params.id)[0]
  // );

  const blogToDisplay = selectBlog(params.id);

  if (!blogToDisplay) {
    return null;
  }
  // TODO: Delete
  // const handleDelete = (blog) => {
  //   const result = dispatch(deleteBlog(blog));
  //   if (result) dispatch(setNotification("Blog deleted", 5));
  //   else if (typeof result === "string") {
  //     if (result.response.data.error.includes("token expired")) {
  //       // TODO: Logout when token expired
  //       // tokenExpiredLogout();
  //     }
  //   }
  // };

  return (
    <>
      <h2>{blogToDisplay.title}</h2>
      <p>
        <a href={blogToDisplay.url} target="_blank" rel="noreferrer">
          {blogToDisplay.url}
        </a>
      </p>
      <p>
        {blogToDisplay.likes} likes{" "}
        <button
          onClick={() => {
            dispatch(like(blogToDisplay));
            dispatch(setNotification("liked", 5));
          }}
          name="like"
          aria-labelledby="like"
        >
          like
        </button>
      </p>
      <p>Added by {blogToDisplay.user.name}</p>
    </>
  );
};
