import { combineReducers } from "redux";
import flights from "./flightReducer";
import passengers from "./passengerReducer";
import user from "./loginReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  flights: flights,
  passengers: passengers,
  user: user,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
