import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import * as passengerActions from "../../redux/actions/passengerActions";
import PropTypes from "prop-types";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import PassengersDetails from "./passengersDetails";
import NewPassenger from "./newPassenger";
import SeatContainer from "../seatmap/seatContainer";
import AncillaryService from "../meals_and_ancillaries/ancillaryService";
import MealService from "../meals_and_ancillaries/mealService";
import MealItem from "../meals_and_ancillaries/mealItem";
import FlightDetails from "../flights/flightDetails";
import UpdatePassengerDetails from "./updatePassengerDetails";
import Header from "../common/header";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

function CheckInPageContainer(props) {
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

      setStateData({
        ...stateData,
        seatMap: seatMap,
      });
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

  const getMatchingPaxId = (passengerList, paxId) => {
    for (let i = 0; i < passengerList.length; i++) {
      if (passengerList[i].id === Number(paxId)) {
        return i;
      }
    }
  };

  const updatePassengerList = (paxId, passengerList) => {
    let i = getMatchingPaxId(passengerList, paxId);
    if (passengerList[i].status === "AC") {
      passengerList[i].status = "NC";
    } else {
      passengerList[i].status = "AC";
    }
    let data = {
      ...passengerList[i],
      status: passengerList[i].status,
    };
    props
      .updatePassenger(data)
      .then(() => {
        console.log("Passenger status Updated");
        toast.success("Passenger Status Updated Successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
    return passengerList;
  };

  const handleClick = (event) => {
    let seatNo = Number(event.target.value);
    let seatMap = stateData.seatMap.slice();
    let paxId = stateData.selectedPassengerId;
    var flag = true;
    let passengerList = passengers.slice();
    let index = getMatchingPaxId(passengerList, paxId);
    let wheelChair = passengerList[index].wheelChair;
    let infant = passengerList[index].infant;
    let status = passengerList[index].status;
    if (status === "AC") {
      status = "NC";
    } else {
      status = "AC";
    }

    for (let i = 0; i < seatMap.length; i++) {
      if (paxId === seatMap[i].paxId) {
        flag = false;
        seatMap.splice(i, 1);
        seatMap = [...seatMap, { paxId, seatNo, wheelChair, infant, status }];
        break;
      }
    }
    if (flag) {
      seatMap = [...seatMap, { paxId, seatNo, wheelChair, infant, status }];
    }

    let updatedPaxList = updatePassengerList(paxId, passengerList);

    setPassengers(updatedPaxList);
    setStateData({ ...stateData, seatMap: seatMap });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!stateData.newItem.length) {
      return;
    }
    let oldItems = stateData.items.slice();
    let newItemMenu = oldItems.concat(stateData.newItem);
    setStateData({ ...stateData, items: newItemMenu, newItem: "" });
    let data = {};
    if (stateData.service === "Meal") {
      data = { ...flight, special_meals: newItemMenu };
    } else {
      data = { ...flight, ancillary: newItemMenu };
    }
    props
      .updateFlight(data)
      .then(() => {
        console.log("Flight Meals/Ancillary Updated Successfully");
        toast.success("Flight Meals/Ancillary Updated Successfully");
      })
      .catch((error) => {
        toast.error("Flight Meals/Ancillary Updation Failed");
        console.log("Failed : " + error);
      });
  };

  const handleChange = (event) => {
    setStateData({ ...stateData, newItem: event.target.value });
  };

  const handleRemove = (event) => {
    let items = stateData.items.slice();
    let newItemMenu = items.filter((item) => item !== event.target.value);
    setStateData({ ...stateData, items: newItemMenu });
    let data = {};
    if (stateData.service === "Meal") {
      data = { ...flight, special_meals: newItemMenu };
    } else {
      data = { ...flight, ancillary: newItemMenu };
    }
    props
      .updateFlight(data)
      .then(() => {
        console.log("Flight Meals/Ancillary Updated Successfully");
        toast.success("Flight Meals/Ancillary Updated Successfully");
      })
      .catch((error) => {
        console.log("Failed : " + error);
        toast.error("Flight Meals/Ancillary Updation Failed");
      });
  };

  const onSelectMealItem = () => {
    setStateData({
      ...stateData,
      service: "Meal",
      items: flight.special_meals,
    });
  };

  const onSelectAncillary = () => {
    setStateData({
      ...stateData,
      service: "Ancillary",
      items: flight.ancillary,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const selectGender = (event) => {
    setStateData({ ...stateData, gender: event.target.value });
  };

  const hasInfant = (event) => {
    let infant = "";
    event.target.checked ? (infant = "Yes") : (infant = "No");
    setStateData({ ...stateData, infant: infant });
  };

  const wheelChairRequired = (event) => {
    let wheelChairRequired = "";
    event.target.checked
      ? (wheelChairRequired = "Yes")
      : (wheelChairRequired = "No");
    setStateData({ ...stateData, wheelChair: wheelChairRequired });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    const data = {
      id: null,
      first_name: stateData.first_name,
      last_name: stateData.last_name,
      mobile_no: stateData.mobile_no,
      gender: stateData.gender,
      infant: stateData.infant,
      wheelChair: stateData.wheelChair,
      flight_id: flight.id,
      status: "NC",
      seat_no: "",
      date_of_birth: stateData.date_of_birth,
      passport: stateData.passport,
      address: stateData.address,
      special_meals: [],
      ancillary: [],
    };
    props
      .createPassenger(data)
      .then(() => {
        console.log("Passenger Created Successfully");
        toast.success("Passenger Created Successfully");
        setStateData({
          ...stateData,
          first_name: "",
          last_name: "",
          mobile_no: "",
          passport: "",
          date_of_birth: "",
          address: "",
        });
      })
      .catch((error) => {
        console.log("Failed : " + error);
        toast.error("Passenger Creation Failed");
      });
  };

  const changeHandler = (event) => {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const updateHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    let selectedPassenger = passengers.find(
      (passenger) => passenger.id === Number(stateData.selectedPassengerId)
    );
    const data = {
      ...selectedPassenger,
      first_name: stateData.first_name,
      last_name: stateData.last_name,
      mobile_no: stateData.mobile_no,
      date_of_birth: stateData.date_of_birth,
      passport: stateData.passport,
      address: stateData.address,
    };
    props
      .updatePassenger(data)
      .then(() => {
        console.log("Passenger Updated");
        toast.success("Passenger Updated Successfully");
        setStateData({
          ...stateData,
          first_name: "",
          last_name: "",
          mobile_no: "",
          passport: "",
          date_of_birth: "",
          address: "",
        });
      })
      .catch((error) => {
        console.log("Failed : " + error);
        toast.error("Passenger Updation Failed");
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {props.user.token === "" || typeof props.user.token === "undefined" ? (
        <Redirect to="/" />
      ) : (
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
                                    return <li key={index + 1}>{ancillary}</li>;
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
                      {!stateData.isAdmin ? (
                        <MDBCol
                          md="6"
                          style={{ textAlign: "center", paddingTop: "10px" }}
                        >
                          <MealService
                            selectedPassengerId={stateData.selectedPassengerId}
                            passengerMealItems={stateData.passengerMealItems}
                            flight={flight}
                            passengerList={passengers}
                            updatepassengerMealItems={updatepassengerMealItems}
                            updateToPreviousMealItem={updateToPreviousMealItems}
                            updatePassenger={props.updatePassenger}
                          />
                        </MDBCol>
                      ) : (
                        <></>
                      )}

                      {!stateData.isAdmin ? (
                        <MDBCol
                          md="6"
                          style={{ textAlign: "center", paddingTop: "10px" }}
                        >
                          <AncillaryService
                            selectedPassengerId={stateData.selectedPassengerId}
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
                      ) : (
                        <></>
                      )}

                      {stateData.isAdmin ? (
                        <MDBCol
                          md="6"
                          style={{ textAlign: "center", paddingTop: "10px" }}
                        >
                          <NewPassenger
                            flightId={flight.id}
                            selectGender={selectGender}
                            hasInfant={hasInfant}
                            wheelChairRequired={wheelChairRequired}
                            submitHandler={submitHandler}
                            changeHandler={changeHandler}
                            passengerDetails={stateData}
                          />
                        </MDBCol>
                      ) : (
                        <></>
                      )}

                      {stateData.isAdmin ? (
                        <MDBCol
                          md="6"
                          style={{ textAlign: "center", paddingTop: "10px" }}
                        >
                          <UpdatePassengerDetails
                            flightId={flight.id}
                            selectGender={selectGender}
                            hasInfant={hasInfant}
                            wheelChairRequired={wheelChairRequired}
                            submitHandler={updateHandler}
                            changeHandler={changeHandler}
                            passengerDetails={stateData}
                          />
                        </MDBCol>
                      ) : (
                        <></>
                      )}
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol xl="4">
                {!stateData.isAdmin ? (
                  <SeatContainer
                    passengerId={stateData.selectedPassengerId}
                    onClick={handleClick}
                    bookedSeatMap={stateData.seatMap}
                  />
                ) : (
                  <>
                    <FlightDetails flightDetails={flight} />
                    <MealItem
                      items={stateData.items}
                      newItem={stateData.newItem}
                      service={stateData.service}
                      handleRemove={handleRemove}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      selectMealItem={onSelectMealItem}
                      selectAncillary={onSelectAncillary}
                    />
                  </>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      )}
    </>
  );
}

CheckInPageContainer.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckInPageContainer);
