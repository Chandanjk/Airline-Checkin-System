import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import * as passengerActions from "../../redux/actions/passengerActions";
import PropTypes from "prop-types";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import PassengersDetails from "./passengersDetails";
import AncillaryService from "../meals_and_ancillaries/ancillaryService";
import MealService from "../meals_and_ancillaries/mealService";
import Header from "../common/header";
import SeatMapSpecialMeals from "../seatmap/seatMapSpecialMeals";
import { Redirect } from "react-router-dom";

function InFLightContainer(props) {
  let isAdmin = false;
  const [flight, setFlight] = useState({ ...props.flight });
  const [passengers, setPassengers] = useState([]);
  const [allPassengers, setAllPassengers] = useState([]);

  if (props.user.role === "admin") {
    isAdmin = true;
  }

  const [stateData, setStateData] = useState({
    selectedPassengerId: "#",
    isAdmin: isAdmin,
    gender: "Male",
    id: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    infant: "No",
    wheelChair: "No",
    date_of_birth: "",
    flight_id: flight.id,
    infantPax: false,
    wcPax: false,
    AcceptedPax: false,
    noPassportPax: false,
    noDOBPax: false,
    noAddressPax: false,
    passport: "",
    address: "",
    seatMap: [],
    passengerAncillaryService: [],
    passengerOldAncillaryService: [],
    passengerMealItems: [],
    passengerOldMealItems: [],
    items: [],
    newItem: "",
    service: "Meal",
  });

  useEffect(() => {
    if (props.flights.length === 0) {
      props.loadFlights().catch((error) => {
        alert("Loading flights failed : " + error);
      });
    } else {
      setFlight({ ...props.flight });
    }

    if (props.passengers.length === 0) {
      props.loadPassengers().catch((error) => {
        alert("Loading Passengers failed : " + error);
      });
    } else {
      setPassengers(
        props.passengers.filter(
          (passenger) => passenger.flight_id === flight.id
        )
      );
      setAllPassengers(
        props.passengers.filter(
          (passenger) => passenger.flight_id === flight.id
        )
      );
      let seatMap = [];
      let pax = props.passengers.filter(
        (passenger) => passenger.flight_id === flight.id
      );
      for (let i = 0; i < pax.length; i++) {
        if (pax[i].seat_no.length > 0) {
          let paxId = String(pax[i].id);
          let seatNo = getSeatNoFromSeatLocation(pax[i].seat_no);
          let wheelChair = pax[i].wheelChair;
          let infant = pax[i].infant;
          let status = pax[i].status;
          seatMap = [...seatMap, { paxId, seatNo, wheelChair, infant, status }];
        }
      }
      setStateData({ ...stateData, seatMap: seatMap });
    }
  }, [props.flight, props.passengers]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const getSeatNoFromSeatLocation = (seatLocation) => {
    let col = String(seatLocation).charAt(0);
    let row = String(seatLocation).substring(1);
    switch (col) {
      case "A":
        col = 0;
        break;
      case "B":
        col = 1;
        break;
      case "C":
        col = 2;
        break;
      case "D":
        col = 3;
        break;
      case "E":
        col = 4;
        break;
      case "F":
        col = 5;
        break;
      default:
        break;
    }
    return (row - 1) * 6 + col;
  };

  const getSeatLocation = (seatNo) => {
    let seatLocation = "";
    let col = seatNo % 6;
    let row = Math.floor(seatNo / 6) + 1;
    switch (col) {
      case 0:
        seatLocation = "A" + row;
        break;
      case 1:
        seatLocation = "B" + row;
        break;
      case 2:
        seatLocation = "C" + row;
        break;
      case 3:
        seatLocation = "D" + row;
        break;
      case 4:
        seatLocation = "E" + row;
        break;
      case 5:
        seatLocation = "F" + row;
        break;
      default:
        break;
    }
    return seatLocation;
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const filterPassenger = (event) => {
    let allPassengerList = allPassengers;
    let filter_Pax_List = [];
    let infantPax = stateData.infantPax;
    let wcPax = stateData.wcPax;
    let AcceptedPax = stateData.AcceptedPax;
    let noAddressPax = stateData.noAddressPax;
    let noPassportPax = stateData.noPassportPax;
    let noDOBPax = stateData.noDOBPax;
    let data = stateData;

    if (event.target.id === "AC_PAX") {
      if (event.target.checked) {
        AcceptedPax = true;
      } else {
        AcceptedPax = false;
      }
      data.AcceptedPax = AcceptedPax;
    } else if (event.target.id === "INFANT_PAX") {
      if (event.target.checked) {
        infantPax = true;
      } else {
        infantPax = false;
      }
      data.infantPax = infantPax;
    } else if (event.target.id === "WHEELCHAIR_PAX") {
      if (event.target.checked) {
        wcPax = true;
      } else {
        wcPax = false;
      }
      data.wcPax = wcPax;
    } else if (event.target.id === "NO_PASSPORT") {
      if (event.target.checked) {
        noPassportPax = true;
      } else {
        noPassportPax = false;
      }
      data.noPassportPax = noPassportPax;
    } else if (event.target.id === "NO_ADDRESS") {
      if (event.target.checked) {
        noAddressPax = true;
      } else {
        noAddressPax = false;
      }
      data.noAddressPax = noAddressPax;
    } else if (event.target.id === "NO_DOB") {
      if (event.target.checked) {
        noDOBPax = true;
      } else {
        noDOBPax = false;
      }
      data.noDOBPax = noDOBPax;
    }
    if (
      !wcPax &&
      !infantPax &&
      !AcceptedPax &&
      !noPassportPax &&
      !noDOBPax &&
      !noAddressPax
    ) {
      setPassengers(allPassengerList);
    } else {
      if (AcceptedPax) {
        filter_Pax_List = allPassengerList.filter(
          (passenger) => passenger.status === "AC"
        );
      }
      if (noPassportPax) {
        filter_Pax_List = allPassengerList.filter(
          (passenger) => passenger.passport === ""
        );
      }
      if (infantPax) {
        if (filter_Pax_List.length !== 0) {
          filter_Pax_List = filter_Pax_List.filter(
            (passenger) => passenger.infant === "Yes"
          );
        } else {
          filter_Pax_List = allPassengerList.filter(
            (passenger) => passenger.infant === "Yes"
          );
        }
      }
      if (wcPax) {
        if (filter_Pax_List.length !== 0) {
          filter_Pax_List = filter_Pax_List.filter(
            (passenger) => passenger.wheelChair === "Yes"
          );
        } else {
          filter_Pax_List = allPassengerList.filter(
            (passenger) => passenger.wheelChair === "Yes"
          );
        }
      }
      if (noDOBPax) {
        if (filter_Pax_List.length !== 0) {
          filter_Pax_List = filter_Pax_List.filter(
            (passenger) => passenger.date_of_birth === ""
          );
        } else {
          filter_Pax_List = allPassengerList.filter(
            (passenger) => passenger.date_of_birth === ""
          );
        }
      }
      if (noAddressPax) {
        if (filter_Pax_List.length !== 0) {
          filter_Pax_List = filter_Pax_List.filter(
            (passenger) => passenger.address === ""
          );
        } else {
          filter_Pax_List = allPassengerList.filter(
            (passenger) => passenger.address === ""
          );
        }
      }
      setPassengers(filter_Pax_List);
    }
    setStateData(data);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const getPassengerId = (event) => {
    let selectedPassenger = passengers.find(
      (passenger) => passenger.id === Number(event.target.value)
    );

    setStateData({
      ...stateData,
      selectedPassengerId: event.target.value,
      first_name: selectedPassenger.first_name,
      last_name: selectedPassenger.last_name,
      mobile_no: selectedPassenger.mobile_no,
      passport: selectedPassenger.passport,
      address: selectedPassenger.address,
      date_of_birth: selectedPassenger.date_of_birth,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const updatePassengerAncillaryService = (event) => {
    let passengerAncillaryService = stateData.passengerAncillaryService.slice();
    let index = Number(event.target.id);
    passengerAncillaryService[index] = !passengerAncillaryService[index];
    setStateData({
      ...stateData,
      passengerAncillaryService: passengerAncillaryService,
    });
  };

  const updateToPreviousAncillaryServices = () => {
    console.log("UNDO Ancillary");
    setStateData({
      ...stateData,
      passengerAncillaryService: stateData.passengerOldAncillaryService,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const updatepassengerMealItems = (event) => {
    let passengerMealItems = stateData.passengerMealItems.slice();
    let index = Number(event.target.id);
    passengerMealItems[index] = !passengerMealItems[index];
    setStateData({ ...stateData, passengerMealItems: passengerMealItems });
  };

  const updateToPreviousMealItems = () => {
    console.log("UNDO Meal");
    setStateData({
      ...stateData,
      passengerMealItems: stateData.passengerOldMealItems,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {props.user.token === "" || typeof props.user.token === "undefined" ? (
        <Redirect to="/" />
      ) : (
        <>
          {!isAdmin ? (
            <>
              <Header flight_id={flight.id} />
              <MDBContainer
                breakpoint="xxl"
                style={{
                  borderRadius: "15px",
                  border: "2px solid",
                  marginTop: "35px",
                  backgroundColor: "#fffdf9",
                }}
              >
                <MDBRow>
                  <MDBCol xl="8">
                    <PassengersDetails
                      flightId={flight.id}
                      onChange={getPassengerId}
                      passengerList={passengers}
                      flightDetails={flight}
                      isAdmin={stateData.isAdmin}
                      passengerId={stateData.selectedPassengerId}
                      filterPassenger={filterPassenger}
                      updatePassenger={props.updatePassenger}
                      getSeatNoFromSeatLocation={getSeatNoFromSeatLocation}
                      getSeatLocation={getSeatLocation}
                    />

                    <MDBRow
                      style={{
                        borderTopStyle: "solid",
                        marginTop: "36px",
                        marginBottom: "10px",
                        marginLeft: "4px",
                        paddingTop: "5px",
                      }}
                    >
                      <MDBCol lg="6">
                        <MDBRow style={{ textAlign: "center" }}>
                          {stateData.selectedPassengerId !== "#" ? (
                            <>
                              <MDBCol
                                md="6"
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <MDBRow>
                                  <b>Special Meals</b>
                                </MDBRow>
                                <ul
                                  style={{
                                    listStyleType: "none",
                                    padding: "0",
                                    margin: "0",
                                  }}
                                >
                                  {passengers &&
                                    passengers.find(
                                      (passenger) =>
                                        passenger.id ===
                                        Number(stateData.selectedPassengerId)
                                    ) &&
                                    passengers
                                      .find(
                                        (passenger) =>
                                          passenger.id ===
                                          Number(stateData.selectedPassengerId)
                                      )
                                      .special_meals.map((meal, index) => {
                                        return <li key={index + 1}>{meal}</li>;
                                      })}
                                </ul>
                              </MDBCol>
                            </>
                          ) : (
                            <></>
                          )}
                          {stateData.selectedPassengerId !== "#" ? (
                            <>
                              <MDBCol md="6">
                                <MDBRow>
                                  <b>Ancillary</b>
                                </MDBRow>
                                <ul
                                  style={{
                                    listStyleType: "none",
                                    padding: "0",
                                    margin: "0",
                                  }}
                                >
                                  {passengers &&
                                    passengers.find(
                                      (passenger) =>
                                        passenger.id ===
                                        Number(stateData.selectedPassengerId)
                                    ) &&
                                    passengers
                                      .find(
                                        (passenger) =>
                                          passenger.id ===
                                          Number(stateData.selectedPassengerId)
                                      )
                                      .ancillary.map((ancillary, index) => {
                                        return (
                                          <li key={index + 1}>{ancillary}</li>
                                        );
                                      })}
                                </ul>
                              </MDBCol>
                            </>
                          ) : (
                            <></>
                          )}
                        </MDBRow>
                      </MDBCol>
                      <MDBCol lg="6">
                        <MDBRow>
                          <MDBCol
                            md="6"
                            style={{ textAlign: "center", paddingTop: "10px" }}
                          >
                            <MealService
                              selectedPassengerId={
                                stateData.selectedPassengerId
                              }
                              passengerMealItems={stateData.passengerMealItems}
                              flight={flight}
                              passengerList={passengers}
                              updatepassengerMealItems={
                                updatepassengerMealItems
                              }
                              updateToPreviousMealItem={
                                updateToPreviousMealItems
                              }
                              updatePassenger={props.updatePassenger}
                            />
                          </MDBCol>

                          <MDBCol
                            md="6"
                            style={{ textAlign: "center", paddingTop: "10px" }}
                          >
                            <AncillaryService
                              selectedPassengerId={
                                stateData.selectedPassengerId
                              }
                              passengerAncillaryService={
                                stateData.passengerAncillaryService
                              }
                              flight={flight}
                              passengerList={passengers}
                              updatePassengerAncillaryService={
                                updatePassengerAncillaryService
                              }
                              updateToPreviousAncillaryServices={
                                updateToPreviousAncillaryServices
                              }
                              updatePassenger={props.updatePassenger}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol xl="4">
                    <SeatMapSpecialMeals
                      passengerList={passengers}
                      getSeatNoFromSeatLocation={getSeatNoFromSeatLocation}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </>
          ) : (
            <Redirect to="/home" />
          )}
        </>
      )}
    </>
  );
}

InFLightContainer.propTypes = {
  flights: PropTypes.array.isRequired,
  passengers: PropTypes.array.isRequired,
  flight: PropTypes.object.isRequired,
  loadFlights: PropTypes.func.isRequired,
  loadPassengers: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  updateFlight: PropTypes.func.isRequired,
  createPassenger: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export function getFlightBySlug(flights, slug) {
  return (
    flights.find((flight) => flight.id.toString() === slug.toString()) || null
  );
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const flight =
    slug && state.flights.length > 0
      ? getFlightBySlug(state.flights, slug)
      : {
          id: null,
          flightNo: null,
          airline: "",
          departureStation: "",
          arrivalStation: "",
          departureDate: "",
          arrivalDate: "",
          special_meals: [],
          ancillary: [],
        };
  return {
    flight: flight,
    flights: state.flights,
    passengers: state.passengers,
    user: state.user,
  };
}

const mapDispatchToProps = {
  loadFlights: flightActions.loadFlights,
  loadPassengers: passengerActions.loadPassengers,
  updatePassenger: passengerActions.updatePassenger,
  updateFlight: flightActions.updateFlight,
  createPassenger: passengerActions.createPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(InFLightContainer);
