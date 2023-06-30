import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/login_data/";

export function getLoginDetails() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
