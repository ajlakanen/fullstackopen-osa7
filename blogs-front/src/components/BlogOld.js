import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, like } from "../reducers/blogReducer";

export const Blog = ({ blog, isOwner }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);
  const [likeStyle, setLikeStyle] = useState("likes");
  const dispatch = useDispatch();

  const toggleView = () => {
    setViewAllInfo(!viewAllInfo);
    setLikeStyle("likes");
  };

  const handleDelete = (blog) => {
    const result = dispatch(deleteBlog(blog));
    if (result) dispatch(setNotification("Blog deleted", 5));
    else if (typeof result === "string") {
      if (result.response.data.error.includes("token expired")) {
        // TODO: Logout when token expired
        // tokenExpiredLogout();
      }
    }
  };

  return (
    <div className="blog">
      <p
        onClick={() => {
          toggleView();
        }}
      >
        {blog.author}: <strong>{blog.title}</strong>{" "}
      </p>{" "}
      {!viewAllInfo && (
        <button onClick={() => toggleView()} name="view" aria-labelledby="view">
          view
        </button>
      )}
      {viewAllInfo && (
        <button
          onClick={() => {
            toggleView();
          }}
          name="hide"
          aria-labelledby="hide"
        >
          hide
        </button>
      )}
      <div>
        {viewAllInfo && (
          <>
            {blog.url}
            <br />
          </>
        )}
        {viewAllInfo && (
          <span>
            likes: <span className={likeStyle}>{blog.likes}</span>{" "}
            <button
              onClick={() => {
                // handleLike(blog);
                dispatch(like(blog));
                // if (likeStyle.includes("clicked")) {
                //   setLikeStyle("likes");
                //   setTimeout(() => {
                //     setLikeStyle("likes clicked");
                //   }, 10);
                // } else {
                //   setLikeStyle("likes clicked");
                // }
                dispatch(setNotification("liked", 5));
              }}
              name="like"
              aria-labelledby="like"
            >
              like
            </button>
          </span>
        )}
        {isOwner && (
          <button
            onClick={() => {
              if (window.confirm(`Delete ${blog.title}`)) {
                handleDelete(blog);
              }
            }}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};
