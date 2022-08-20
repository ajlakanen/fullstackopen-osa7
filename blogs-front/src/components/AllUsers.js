import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";

export const AllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);
  const users = useSelector((state) => state.users);
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.username}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
