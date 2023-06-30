import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlightsListContainer from "./flights/flightsListContainer";
import CheckInPageContainer from "./passengers/checkInPageContainer";
import InFLightPageContainer from "./passengers/inFLightPageContainer";
import LoginContainer from "./login/loginContainer";
import LogOutContainer from "./login/logOutContainer";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div
      style={{
        textalign: "center",
      }}
    >
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route path="/home/" component={FlightsListContainer} />
        <Route path="/checkin/:slug" component={CheckInPageContainer} />
        <Route path="/checkin/" component={CheckInPageContainer} />
        <Route path="/inflight/:slug" component={InFLightPageContainer} />
        <Route path="/inflight" component={InFLightPageContainer} />
        <Route path="/logout" component={LogOutContainer} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}
export default App;
