import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import PropTypes from "prop-types";
import "../../css/loginPage.css";

const Login = (props) => (
  <div className="wrapper fadeInDown">
    <span>
      <h1 className="heading1 active"> AIRLINE CHECK IN SYSTEM </h1>
    </span>
    <div id="formContent">
      <h2 className="heading2 active"> Sign In </h2>

      <form>
        <input
          required
          type="text"
          id="login"
          className="inputFields fadeIn second"
          name="email"
          placeholder="login"
          onChange={props.onChange}
        />
        <input
          required
          type="password"
          id="password"
          className="inputFields fadeIn third"
          name="password"
          placeholder="password"
          onChange={props.onChange}
        />
        <input
          type="button"
          className="inputBtn fadeIn fourth"
          value="Log In"
          onClick={props.handleLogin}
        />
        <div
          className="fadeIn fourth"
          id="googleLogin"
          style={{ padding: "0" }}
        >
          <GoogleOAuthProvider clientId="899221440247-8iblgn45r0u0vtfberjl4eq8pg7dk1f9.apps.googleusercontent.com">
            <React.StrictMode>
              <GoogleLogin
                onSuccess={props.successGoogleLogin}
                onFailure={props.failureGoogleLogin}
              />
            </React.StrictMode>
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  </div>
);

Login.propTypes = {
  successGoogleLogin: PropTypes.func.isRequired,
  failureGoogleLogin: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Login;
