import { useState } from "react";

export const LoginForm = ({ handleSubmit, handleCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event, username, password);
        }}
      >
        <p>
          username:{" "}
          <input
            type="text"
            id="username"
            name="username"
            aria-labelledby="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </p>
        <p>
          password{" "}
          <input
            type="password"
            id="password"
            name="password"
            aria-labelledby="password"
            autoComplete="on"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <button id="login-button" type="submit">
          login
        </button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
};
