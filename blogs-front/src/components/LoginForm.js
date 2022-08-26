import { useState } from "react";
import { Button, TextField } from "@mui/material";
export const LoginForm = ({ handleSubmit, handleCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, username, password);
        }}
      >
        <p>
          <TextField
            label="username:"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </p>
        <p>
          <TextField
            label="password"
            type="password"
            autoComplete="on"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <Button variant="contained" id="login-button" type="submit">
          login
        </Button>{" "}
        <Button variant="outlined" onClick={handleCancel}>
          cancel
        </Button>
      </form>
    </div>
  );
};
