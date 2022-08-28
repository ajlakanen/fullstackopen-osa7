import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutStarted, loggedOut } from "../reducers/authReducer";

export const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  handleLogout();

  dispatch(logoutStarted());

  setTimeout(() => {
    dispatch(loggedOut());

    navigate("/");
  }, 5000);

  console.log("Logging out...");
  return (
    <>
      <p>asdf asdFasdf</p>
      <p>Logging out...</p>
    </>
  );
};
