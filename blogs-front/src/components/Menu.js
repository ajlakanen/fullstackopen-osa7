import { Link } from "react-router-dom";

export const Menu = ({ currentUser, handleLogout }) => {
  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {currentUser.name} ({currentUser.username}) logged in
        <button
          name="logout"
          aria-labelledby="logout"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};
