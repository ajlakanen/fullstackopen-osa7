/* eslint-disable indent */
import { Filter } from "./Filter";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { BlogForm } from "./BlogForm";

export const Bloglist = () => {
  const [newFilter, setNewFilter] = useState("");
  const allBlogs = useSelector((state) => state.blogs);
  const blogsToShow =
    newFilter === ""
      ? allBlogs
      : allBlogs
          .slice()
          .filter((blog) =>
            blog.title.toLowerCase().includes(newFilter.toLowerCase())
          );

  return (
    <>
      <h1>Blogs</h1>
      <BlogForm />
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogsToShow
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`blogs/${blog.id}`}>{blog.title}</Link>{" "}
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
