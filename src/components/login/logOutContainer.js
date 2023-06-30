import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as loginActions from "../../redux/actions/loginActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const LogOutContainer = (props) => {
  useEffect(() => {
    props.actions.removeUserDetail();
  }, []);

  return (
    <div>
      {toast.success("LogOut Success")}
      <Redirect to="/" />
    </div>
  );
};

LogOutContainer.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeUserDetail: () => dispatch(loginActions.removeUserDetail()),
    },
  };
}

export default connect(null, mapDispatchToProps)(LogOutContainer);
