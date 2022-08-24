import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";

export const Menu = ({ currentUser }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs{" "}
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {currentUser.name} ({currentUser.username}) logged in
          <Button color="inherit" component={Link} to="/logout">
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
