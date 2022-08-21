import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const User = () => {
  let params = useParams();
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

  return (
    <>
      <p>
        <Link to="/users">All users</Link>
      </p>
      <h2>
        {userToDisplay.name} ({userToDisplay.username})
      </h2>
      <h3>Added blogs</h3>
      <div>
        <ul>
          {userToDisplay.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
