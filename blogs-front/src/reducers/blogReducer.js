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

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const selectBlog = (id) => (state) => {
  return state.blogs.filter((b) => b.id === id)[0];
};

export const like = (blog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.update(blog.id.toString(), {
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(returnedBlog));
      return true;
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const addComment = ({ blog, content }) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.comment(blog.id, content);
      const blogs = await blogService.getAll();

      dispatch(
        setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)))
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id);
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs.filter((p) => p.id !== blog.id)));
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
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
      console.log("1");
      const returnedBlog = await blogService.create(blogObject);
      dispatch(appendBlog(returnedBlog));
      return true;
    } catch (error) {
      return error.response;
    }
  };
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },

    updateBlog(state, action) {
      return state.map((b) =>
        b.id !== action.payload.id ? b : action.payload
      );
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, updateBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
