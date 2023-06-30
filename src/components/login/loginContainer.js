import React, { useState } from "react";
import Login from "./login";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as loginActions from "../../redux/actions/loginActions";
import PropTypes from "prop-types";
import * as loginApi from "../../api/loginApi";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const LoginContainer = (props) => {
  const [stateData, setStateData] = useState({
    email: "",
    password: "",
    loggedIn: false,
    error: "",
  });

  const onChange = (event) => {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    loginApi
      .getLoginDetails()
      .then((users) => {
        let user = users.find(
          (user) =>
            user.email === stateData.email &&
            user.password === stateData.password
        );
        if (Object.entries(user).length !== 0) {
          console.log("Login Success");
          toast.success("Login Success");
          props.actions.updateUserDetail(user.role, user.firstName);
          setStateData({ ...stateData, loggedIn: true });
        }
      })
      .catch((error) => {
        toast.error("Login Failed : Please Enter Valid Credentials");
        console.log("Login Failed : " + error);
      });
  };

  const successGoogleLogin = (response) => {
    let user = jwt_decode(response.credential);
    if (user.email.includes("admn")) {
      props.actions.updateUserDetail("admin", user.name);
    } else {
      props.actions.updateUserDetail("staff", user.name);
    }
    toast.success("Login Success");

    setStateData({ ...stateData, loggedIn: true });
  };

  const failureGoogleLogin = (response) => {
    toast.error("Login Failed : Please Enter Valid Credentials");
    console.log(response);
  };

  return (
    <div>
      {stateData.loggedIn ? (
        <Redirect to="/home" />
      ) : (
        <Login
          handleLogin={handleLogin}
          onChange={onChange}
          successGoogleLogin={successGoogleLogin}
          failureGoogleLogin={failureGoogleLogin}
        />
      )}
    </div>
  );
};

LoginContainer.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateUserDetail: (role, userName) =>
        dispatch(
          loginActions.updateUserDetail(role, userName, "Login-Attempt")
        ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
