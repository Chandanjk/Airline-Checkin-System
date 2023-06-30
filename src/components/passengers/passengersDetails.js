import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import UpdatePassengerSeat from "./updatePassengerSeat";
import Spinner from "../common/spinner";
import { connect } from "react-redux";

const PassengersDetails = (props) => {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => {
    setGridModal(!gridModal);
  };

  const updateAndClose = (event) => {
    setGridModal(!gridModal);

    let selectedPassenger = props.passengerList.find(
      (passenger) => passenger.id === Number(props.passengerId)
    );

    selectedPassenger = {
      ...selectedPassenger,
      seat_no: props.getSeatLocation(event.target.value),
    };

    props
      .updatePassenger(selectedPassenger)
      .then(() => {
        console.log("Passenger Seat Updated");
      })
      .catch((error) => {
        console.log("Failed : " + error);
      });
  };

  return (
    <div style={{ padding: "7px", paddingBottom: "7px" }}>
      {!props.isAdmin ? (
        <>
          <div
            style={{
              borderBottomStyle: "solid",
              marginBottom: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <MDBContainer className="">
              <MDBRow>
                <MDBCol md="3">
                  <b>AIRLINE : </b> {props.flightDetails.airline}
                </MDBCol>
                <MDBCol md="3">
                  <b>DEP STN : </b> {props.flightDetails.departureStation}
                </MDBCol>
                <MDBCol md="3">
                  <b>DEP DATE : </b>{" "}
                  {props.flightDetails.departureDate.substring(0, 10)}
                </MDBCol>
                <MDBCol md="3">
                  <b>TIME : </b>{" "}
                  {props.flightDetails.departureDate.substring(11, 16)}
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="3">
                  <b>FLIGHT No : </b> {props.flightDetails.flightNo}
                </MDBCol>
                <MDBCol md="3">
                  <b>ARV STN : </b> {props.flightDetails.arrivalStation}
                </MDBCol>
                <MDBCol md="3">
                  <b>ARV DATE : </b>{" "}
                  {props.flightDetails.arrivalDate.substring(0, 10)}
                </MDBCol>
                <MDBCol md="3">
                  <b>TIME : </b>{" "}
                  {props.flightDetails.arrivalDate.substring(11, 16)}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>

          <MDBContainer
            style={{
              borderBottomStyle: "solid",
              marginBottom: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <MDBRow>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="AC_PAX"
                  onClick={props.filterPassenger}
                />
                <b>Accepted Passenger</b>
              </MDBCol>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="INFANT_PAX"
                  onClick={props.filterPassenger}
                />
                <b>Passenger-Infant</b>
              </MDBCol>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="WHEELCHAIR_PAX"
                  onClick={props.filterPassenger}
                />
                <b>Passenger-WheelChair</b>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      ) : (
        <>
          <MDBContainer
            style={{
              borderBottomStyle: "solid",
              marginBottom: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <MDBRow>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="NO_PASSPORT"
                  onClick={props.filterPassenger}
                />
                <b>Without Passport</b>
              </MDBCol>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="NO_ADDRESS"
                  onClick={props.filterPassenger}
                />
                <b>No Address Detail</b>
              </MDBCol>
              <MDBCol md="4">
                <input
                  type="checkbox"
                  id="NO_DOB"
                  onClick={props.filterPassenger}
                />
                <b>No Date of Birth</b>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      )}
      {props.loading ? (
        <Spinner />
      ) : (
        <form style={{ overflow: "auto", maxHeight: "420px" }}>
          <MDBTable paging="true" striped bordered hover size="lg">
            <thead className="">
              <tr>
                <th>Select</th>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th
                  style={!props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Seat No
                </th>
                <th
                  style={!props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Status
                </th>
                <th
                  style={!props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Infant
                </th>
                <th
                  style={!props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  WheelChair
                </th>
                <th
                  style={props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Passport
                </th>
                <th
                  style={props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Date of Birth
                </th>
                <th
                  style={props.isAdmin ? { display: "" } : { display: "none" }}
                >
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {props.passengerList &&
                props.passengerList.map((passengers, index) => {
                  return (
                    <tr
                      style={
                        String(passengers.id) === props.passengerId
                          ? { backgroundColor: "#f0cf85" }
                          : null
                      }
                      key={index}
                    >
                      <td>
                        <input
                          type="radio"
                          value={passengers.id}
                          name="passenger"
                          onChange={props.onChange}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{passengers.first_name}</td>
                      <td>{passengers.last_name}</td>
                      <td>{passengers.gender}</td>
                      <td
                        style={
                          !props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.seat_no}
                      </td>
                      <td
                        style={
                          !props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.status}
                      </td>
                      <td
                        style={
                          !props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.infant}
                      </td>
                      <td
                        style={
                          !props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.wheelChair}
                      </td>
                      <td
                        style={
                          props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.passport}
                      </td>
                      <td
                        style={
                          props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.date_of_birth}
                      </td>
                      <td
                        style={
                          props.isAdmin ? { display: "" } : { display: "none" }
                        }
                      >
                        {passengers.address}
                      </td>
                      {!window.location.href.includes("inflight") ? (
                        <td>
                          <button
                            type="button"
                            className="btn btn-link"
                            disabled={
                              Number(props.passengerId) !== passengers.id
                            }
                            onClick={toggleShow}
                          >
                            Update Seat
                          </button>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </MDBTable>
        </form>
      )}

      <MDBModal tabIndex="-1" show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="text-center" tag="h5">
              <b>Update Seat</b>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "center" }}>
              <UpdatePassengerSeat
                passengerList={props.passengerList}
                passengerId={props.passengerId}
                onClick={updateAndClose}
                getSeatNoFromSeatLocation={props.getSeatNoFromSeatLocation}
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

PassengersDetails.propTypes = {
  flightDetails: PropTypes.object.isRequired,
  passengerList: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  passengerId: PropTypes.string.isRequired,
  filterPassenger: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  getSeatNoFromSeatLocation: PropTypes.func.isRequired,
  getSeatLocation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps, null)(PassengersDetails);
