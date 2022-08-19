import { Filter } from "./Filter";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Blog } from "./Blog";

export const Bloglist = () => {
  const [newFilter, setNewFilter] = useState("");
  const blogsToShow = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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
          //.sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Blog
                blog={blog}
                isOwner={
                  blog.user ? blog.user.username === user.username : false
                }
              />{" "}
            </li>
          ))}
      </ul>
    </>
  );
};
