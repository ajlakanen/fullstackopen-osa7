import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

export const Users = () => {
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
            <th>Name</th> <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
