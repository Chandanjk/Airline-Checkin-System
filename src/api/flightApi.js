import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/flights_data/";

export function getFlightsDetails() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function updateFlightDetails(data) {
  return fetch(baseUrl + data.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
