import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useSelector } from "react-redux";

export const User = ({ userid }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const userToDisplay = useSelector(
    (state) => state.users.filter((u) => u.id === userid)[0]
  );

  if (!userToDisplay) {
    return null;
  }
  console.log("userToDisplay", userToDisplay);

  return (
    <>
      <p>
        <Link to="/users">All users</Link>
      </p>
      {userid} {userToDisplay.username}
    </>
  );
};
