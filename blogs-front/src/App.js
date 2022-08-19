/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { BlogForm } from "./components/BlogForm";
import { Bloglist } from "./components/Bloglist";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const dispatch = useDispatch();

  // TODO: Logout when token expired
  // function tokenExpiredLogout() {
  //   dispatch(setNotification("Login expired, please wait, logging out...", 5));
  //   setTimeout(() => {
  //     setUser(null);
  //   }, 5000);
  // }

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const user = useSelector((state) => state.user);

  // TODO: MOdify existing blog
  // eslint-disable-next-line no-unused-vars
  // const modifyPhoneNumber = (person, newNumber) => {
  //   const changedPerson = { ...person, number: newNumber };
  //   blogService
  //     .update(person.id, changedPerson)
  //     .then((returnedPerson) => {
  //       setBlogs(blogs.map((p) => (p.id !== person.id ? p : returnedPerson)));
  //     })
  //     .then(() => {
  //       dispatch(setNotification("Number changed", 5));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response.data.error.includes("Validation failed")) {
  //         dispatch(setNotification(`${error.response.data.error}`, 5));
  //       } else {
  //         dispatch(
  //           setNotification(
  //             `Person '${person.name}' was already deleted from server`,
  //             5
  //           )
  //         );
  //         setBlogs(blogs.filter((p) => p.id !== person.id));
  //       }
  //     });
  // };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    if (username.length === 0 || password.length === 0) {
      dispatch(setNotification("insert username and password", 5));
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setLoginVisible(false);
      dispatch(setNotification(`${user.username} logged in`, 5));
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5));
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
            dispatch(setUser(null));
            dispatch(setNotification("Logged out.", 5));
          }}
        >
          Logout
        </button>
      </p>
    );
  };

  // TODO: filter
  // newFilter === ""
  //   ? blogs
  //   : blogs.filter((blog) =>
  //       blog.title.toLowerCase().includes(newFilter.toLowerCase())
  //     );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div>
        {user === null && loginForm()}
        {user !== null && loginInfo()}
        {user !== null && <BlogForm />}
        {user !== null && <Bloglist />}
      </div>
      <footer>
        <p>Bloglist app, Antti-Jussi Lakanen</p>
      </footer>
    </div>
  );
};

export default App;
