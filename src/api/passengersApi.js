import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/passengers_data/";

export function getPassengersDetails() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function updatePassengerDetails(data) {
  return fetch(baseUrl + data.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createPassenger(data) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
