import { Link } from "react-router-dom";
export const Menu = ({ currentUser }) => {
  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {currentUser.name} ({currentUser.username}) logged in
      </div>
    </>
  );
};
