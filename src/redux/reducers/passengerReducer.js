import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function passengerReducer(
  state = initialState.passengers,
  action
) {
  switch (action.type) {
    case types.LOAD_PASSENGERS_SUCCESS:
      return action.passengers;
    case types.UPDATE_PASSENGER_SUCCESS:
      return state.map((passenger) =>
        passenger.id === action.passenger.id ? action.passenger : passenger
      );
    case types.CREATE_PASSENGER_SUCCESS:
      return [...state, { ...action.passenger }];
    default:
      return state;
  }
}
