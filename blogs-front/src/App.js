/* eslint-disable indent */
import { useState, useEffect } from "react";
import { BlogForm } from "./components/BlogForm";
import { Blog } from "./components/Blog";
import { Filter } from "./components/Filter";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const modifyPhoneNumber = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber };
    blogService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setBlogs(blogs.map((p) => (p.id !== person.id ? p : returnedPerson)));
      })
      .then(() => {
        setNotification({ message: "Number changed", style: "info" });
      })
      .then(() => {
        setTimeout(() => {
          setNotification({ message: null });
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error.includes("Validation failed")) {
          setNotification({
            message: `${error.response.data.error}`,
            style: "error",
          });
        } else {
          setNotification(
            `Person '${person.name}' was already deleted from server`,
            5
          );
          setBlogs(blogs.filter((p) => p.id !== person.id));
        }
      });
  };

  const addLike = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id.toString(), {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
      return true;
    } catch (error) {
      setNotification(`${error.response.data.error}`);
      return false;
    }
  };

  function tokenExpiredLogout() {
    setNotification("Login expired, please wait, logging out...", 5);
    setTimeout(() => {
      setUser(null);
    }, 5000);
  }

  const addBlog = async ({ newTitle, newAuthor, newUrl }) => {
    if (
      newTitle.length === 0 ||
      newAuthor.length === 0 ||
      newUrl.length === 0
    ) {
      setNotification({
        message: "Title, author or url missing",
        style: "error",
      });
      return false;
    }

    // TODO: MODIFICATION OF EXISTING BLOG
    // const existing = blogs.filter((blog) => blog.name === newTitle);
    // if (existing.length > 0) {
    //   if (window.confirm(`Replace ${newTitle} phone number?`)) {
    //     modifyPhoneNumber(existing[0], newAuthor);
    //     return;
    //     // TODO: What happens when user presses cancel?
    //   }
    // }

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      //showNotification({ message: "New blog added", style: "success" });
      setNotification("New blog added", 5);
      return true;
    } catch (error) {
      if (error.response.data.error.includes("validation failed")) {
        setNotification(`${error.response.data.error}`, 5);
      }
      if (error.response.data.error.includes("token expired")) {
        tokenExpiredLogout();
      }
      return false;
    }
  };

  // const showNotification = ({ message, style }) => {
  //   setNotification({
  //     message,
  //     style,
  //   });
  //   setTimeout(() => {
  //     setNotification({ message: "" });
  //   }, 5000);
  // };

  /* TODO */
  const handleDeleteClick = async (blog) => {
    if (window.confirm(`Delete ${blog.title}`)) {
      try {
        //const response =
        await blogService.deleteBlog(blog.id);
        console.log("1");
        setBlogs(blogs.filter((p) => p.id !== blog.id));
        setNotification("Blog deleted", 5);
      } catch (error) {
        console.log(error);
        if (error.response.data.error.includes("token expired")) {
          tokenExpiredLogout();
        }
      }
    }
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    if (username.length === 0 || password.length === 0) {
      setNotification("insert username and password", 5);
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setLoginVisible(false);
      setNotification(`${user.username} logged in`, 5);
    } catch (exception) {
      setNotification("wrong username or password", 5);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setLoginVisible(false);
  };

  const loginForm = () => {
    if (loginVisible) {
      return (
        <LoginForm handleSubmit={handleLogin} handleCancel={handleCancel} />
      );
    } else {
      return <button onClick={() => setLoginVisible(true)}>login</button>;
    }
  };

  const blogForm = () => {
    return <BlogForm addBlog={addBlog} />;
  };

  const loginInfo = () => {
    return (
      <p>
        {user.name} ({user.username}) logged in.{" "}
        <button
          name="logout"
          aria-labelledby="logout"
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            blogService.setToken(null);
            setUser(null);
            setNotification("Logged out.", 5);
          }}
        >
          Logout
        </button>
      </p>
    );
  };

  const blogsToShow =
    newFilter === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(newFilter.toLowerCase())
        );

  const blogList = () => {
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
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id}>
                <Blog
                  blog={blog}
                  handleLike={addLike}
                  handleDelete={handleDeleteClick}
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div>
        {user === null && loginForm()}
        {user !== null && loginInfo()}
        {user !== null && blogForm()}
        {user !== null && blogList()}
      </div>
      <footer>
        <p>Bloglist app, Antti-Jussi Lakanen</p>
      </footer>
    </div>
  );
};

export default App;
