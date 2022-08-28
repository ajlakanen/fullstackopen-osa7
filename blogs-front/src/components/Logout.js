import { useNavigate } from "react-router-dom";

export const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();
  handleLogout();

  setTimeout(() => {
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
