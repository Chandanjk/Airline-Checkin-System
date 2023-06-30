import * as types from "./actionTypes";
import * as flightApi from "../../api/flightApi";
import { beginApiCall } from "./apiStatusActions";

export function loadFlightsSuccess(flights) {
  return { type: types.LOAD_FLIGHTS_SUCCESS, flights: flights };
}

export function updateFlightSuccess(flight) {
  return { type: types.UPDATE_FLIGHT_SUCCESS, flight: flight };
}

//thunk definition
export function loadFlights() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return flightApi
      .getFlightsDetails()
      .then((flights) => {
        dispatch(loadFlightsSuccess(flights));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateFlight(data) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return flightApi
      .updateFlightDetails(data)
      .then((updatedFlight) => {
        dispatch(updateFlightSuccess(updatedFlight));
      })
      .catch((error) => {
        throw error;
      });
  };
}
