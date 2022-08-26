import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";

export const Menu = ({ currentUser }) => {
  // eslint-disable-next-line no-unused-vars
  const menuDivs = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <div>
            <Button color="inherit" component={Link} to="/">
              blogs{" "}
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </div>
          <div>
            {currentUser.name} ({currentUser.username}) logged in
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/logout"
            >
              logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
