import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const User = () => {
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const userToDisplay = useSelector(
    (state) => state.users.filter((u) => u.id === params.id)[0]
  );

  if (!userToDisplay) {
    console.log("no user");
    return null;
  }
  console.log("userToDisplay", userToDisplay);

  return (
    <>
      <p>
        <Link to="/users">All users</Link>
      </p>
      <p>
        {userToDisplay.username} {userToDisplay.id}
      </p>
    </>
  );
};
