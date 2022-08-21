import { Link } from "react-router-dom";
export const Menu = () => {
  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">userss</Link>
        <Link to="/about">about</Link>
      </div>
    </>
  );
};
