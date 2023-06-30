import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.UPDATE_USER_DETAILS:
      return {
        ...state,
        role: action.user.role,
        token: action.user.token,
        userName: action.user.userName,
      };
    case types.REMOVE_USER_DETAILS:
      return {
        ...state,
        role: "",
        token: "",
        userName: "",
      };
    default:
      return state;
  }
}
