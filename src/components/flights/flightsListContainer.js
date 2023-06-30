import React from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import FlightsList from "./flightsList";
import { Redirect } from "react-router-dom";
import Header from "../common/header";
import Spinner from "../common/spinner";

class FlightsListContainer extends React.Component {
  componentDidMount() {
    this.props.actions.loadFlights().catch((error) => {
      alert("Loading flights failed : " + error);
    });
  }

  render() {
    if (
      this.props.user.token === "" ||
      typeof this.props.user.token === "undefined"
    ) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <Header flight_id={0} />
          {this.props.loading ? (
            <Spinner />
          ) : (
            <FlightsList flightsList={this.props.flights} />
          )}
        </>
      );
    }
  }
}

FlightsListContainer.propTypes = {
  flights: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights,
    user: state.user,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadFlights: bindActionCreators(flightActions.loadFlights, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightsListContainer);
