import * as types from "./actionTypes";

export function updateUserDetail(role, userName, token) {
  return {
    type: types.UPDATE_USER_DETAILS,
    user: { role: role, userName: userName, token: token },
  };
}
export function removeUserDetail() {
  return {
    type: types.REMOVE_USER_DETAILS,
  };
}
