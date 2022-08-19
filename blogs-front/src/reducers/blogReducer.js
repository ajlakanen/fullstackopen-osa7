import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (blog) => {
//   return {
//     content: blog,
//     id: getId(),
//     votes: 0,
//   };
// };

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = ({ newTitle, newAuthor, newUrl }) => {
  return async (dispatch) => {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      dispatch(appendBlog(returnedBlog));
      return true;
    } catch (error) {
      if (error.response.data.error.includes("validation failed")) {
        return error.response.data.error;
      }
      return false;
    }
  };
};

// This is some template code for future work on voting
// export const vote = (id) => {
//   return async (dispatch) => {
//     const anecdotesOriginal = await anecdoteService.getAll();
//     const anecdoteToChange = anecdotesOriginal.find((a) => a.id === id);
//     const changedAnecdote = {
//       ...anecdoteToChange,
//       votes: anecdoteToChange.votes + 1,
//     };
//     const response = await anecdoteService.update(id, changedAnecdote);
//     const anecdotesChanged = anecdotesOriginal.map((a) =>
//       a.id !== id ? a : { ...a, votes: a.votes + 1 }
//     );
//     dispatch(setBlogs(anecdotesChanged));
//   };
// };

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      console.log("4");
      state.push(action.payload);
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
