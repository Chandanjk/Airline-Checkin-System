import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.flights, action) {
  switch (action.type) {
    case types.LOAD_FLIGHTS_SUCCESS:
      return action.flights;
    case types.UPDATE_FLIGHT_SUCCESS:
      return state.map((flight) =>
        flight.id === action.flight.id ? action.flight : flight
      );
    default:
      return state;
  }
}
