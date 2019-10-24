import React from "react";
import PropTypes from "prop-types";

const Loginform = ({ handleSubmit, username, password }) => {
  return (
    <div className="loginform">
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username <input {...username} reset={null} />
        </div>

        <div>
          password <input {...password} reset={null} />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Loginform.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
  // usernameField: PropTypes.string.isRequired,
  // passwordField: PropTypes.string.isRequired,
  // handleUsernameChange: PropTypes.func.isRequired,
  // handlePasswordChange: PropTypes.func.isRequired,
};

export default Loginform;
