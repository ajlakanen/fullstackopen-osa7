import { Filter } from "./Filter";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Bloglist = () => {
  const [newFilter, setNewFilter] = useState("");
  const blogsToShow = useSelector((state) => state.blogs);
  // const user = useSelector((state) => state.user);
  // const [viewAllInfo, setViewAllInfo] = useState(false);

  // const toggleView = () => {
  //   setViewAllInfo(!viewAllInfo);
  // };
  const blogItem = (blog) => {
    return (
      <div className="blog">
        <Link to={`blogs/${blog.id}`}>
          {blog.author}: <strong>{blog.title}</strong>
        </Link>{" "}
      </div>
    );
  };

  // <Blog
  //   blog={blog}
  //   isOwner={
  //     blog.user ? blog.user.username === user.username : false
  //   }
  // />{" "}

  return (
    <>
      <h2>Blogs</h2>
      <Filter
        value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      />
      <p>
        {newFilter.length === 0 ? (
          <></>
        ) : blogsToShow.length === 0 ? (
          <>No results</>
        ) : (
          <span>Filter in use</span>
        )}
      </p>
      <ul className="bloglist">
        {blogsToShow
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}> {blogItem(blog)}</li>
          ))}
      </ul>
    </>
  );
};
