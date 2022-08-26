export const Logout = ({ handleLogout }) => {
  handleLogout();

  console.log("Logging out...");
  return (
    <>
      <p>Logging out...</p>
    </>
  );
};
