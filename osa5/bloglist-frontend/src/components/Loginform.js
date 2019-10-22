import React from "react";

const Loginform = ({
  handleSubmit,
  usernameField,
  passwordField,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username{" "}
          <input
            type="text"
            value={usernameField}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password{" "}
          <input
            type="password"
            value={passwordField}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginform
