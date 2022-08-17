import { useState } from "react";

export const Blog = ({ blog, handleLike, handleDelete, isOwner }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);
  const [likeStyle, setLikeStyle] = useState("likes");

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
        <span className="debug">{isOwner.toString()}</span>
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
                handleLike(blog);
                if (likeStyle.includes("clicked")) {
                  setLikeStyle("likes");
                  setTimeout(() => {
                    setLikeStyle("likes clicked");
                  }, 10);
                } else {
                  setLikeStyle("likes clicked");
                }
              }}
              name="like"
              aria-labelledby="like"
            >
              like
            </button>
          </span>
        )}
        {isOwner ? (
          <button
            onClick={() => {
              console.log(blog);
              handleDelete(blog);
            }}
          >
            delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
