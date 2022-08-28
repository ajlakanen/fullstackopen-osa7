/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Blog } from "./components/Blog";
import { Bloglist } from "./components/Bloglist";
import { User } from "./components/User";
import { Logout } from "./components/Logout";
import { Menu } from "./components/Menu";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { showNotification } from "./reducers/notificationReducer";
import { useSelector } from "react-redux";
import { getBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AllUsers } from "./components/AllUsers";
import { initializeUsers } from "./reducers/usersReducer";
import { Box, Button } from "@mui/material";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: Logout when token expired
  // function tokenExpiredLogout() {
  //   dispatch(showNotification("Login expired, please wait, logging out...", 5));
  //   setTimeout(() => {
  //     setUser(null);
  //   }, 5000);
  // }

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(currentUser));
      blogService.setToken(currentUser.token);
    }
  }, []);

  const currentUser = useSelector((state) => state.user);

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
  //       dispatch(showNotification("Number changed", 5));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response.data.error.includes("Validation failed")) {
  //         dispatch(showNotification(`${error.response.data.error}`, 5));
  //       } else {
  //         dispatch(
  //           showNotification(
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
      dispatch(showNotification("insert username and password", "error", 5));
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
      dispatch(showNotification(`${user.username} logged in`, "success", 5));
    } catch (exception) {
      dispatch(showNotification("wrong username or password", "error", 5));
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
      return (
        <Button variant="contained" onClick={() => setLoginVisible(true)}>
          login
        </Button>
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch(setUser(null));
    navigate("/");
    dispatch(showNotification("Logging out...", "info", 5));
  };

  if (!currentUser)
    return (
      <>
        <h1>Blogs</h1>
        <Notification />

        {loginForm()}
      </>
    );
  else
    return (
      <div>
        <Menu currentUser={currentUser} handleLogout={handleLogout} />
        <Notification />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Bloglist />{" "}
                </>
              }
            />
            <Route path="/users">
              <Route index element={<AllUsers />} />
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route
              path="/logout"
              element={<Logout handleLogout={handleLogout} />}
            />
          </Routes>
        </div>
        <footer>
          <Box>
            <p>Bloglist app, Antti-Jussi Lakanen</p>
          </Box>
        </footer>
      </div>
    );
};

export default App;
