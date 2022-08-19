import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { like } from "../reducers/blogReducer";

export const Blog = ({ blog, handleDelete, isOwner }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);
  const [likeStyle, setLikeStyle] = useState("likes");
  const dispatch = useDispatch();

  const toggleView = () => {
    setViewAllInfo(!viewAllInfo);
    setLikeStyle("likes");
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
              console.log(blog);
              handleDelete(blog);
            }}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};
