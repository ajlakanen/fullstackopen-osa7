import { AllUsers } from "./AllUsers";
import { useMatch } from "react-router-dom";
import { User } from "./User";

export const Users = () => {
  const match = useMatch("/users/:id");
  match && console.log("match", match.params.id);
  return (
    <>
      {!match && <AllUsers />}
      {match && <User userid={match.params.id} />}
    </>
  );
};
