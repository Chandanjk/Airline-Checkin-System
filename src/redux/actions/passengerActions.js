import * as types from "./actionTypes";
import * as passengersApi from "../../api/passengersApi";
import { beginApiCall } from "./apiStatusActions";

export function loadPassengersSuccess(passengers) {
  return { type: types.LOAD_PASSENGERS_SUCCESS, passengers: passengers };
}

export function updatePassengerSuccess(passenger) {
  return { type: types.UPDATE_PASSENGER_SUCCESS, passenger: passenger };
}

export function createPassengerSuccess(passenger) {
  return { type: types.CREATE_PASSENGER_SUCCESS, passenger: passenger };
}

//thunk definition
export function loadPassengers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return passengersApi
      .getPassengersDetails()
      .then((passengers) => {
        dispatch(loadPassengersSuccess(passengers));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updatePassenger(data) {
  return function (dispatch) {
    return passengersApi
      .updatePassengerDetails(data)
      .then((updatedPassenger) => {
        dispatch(updatePassengerSuccess(updatedPassenger));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createPassenger(data) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return passengersApi
      .createPassenger(data)
      .then((createdPassenger) => {
        dispatch(createPassengerSuccess(createdPassenger));
      })
      .catch((error) => {
        throw error;
      });
  };
}
