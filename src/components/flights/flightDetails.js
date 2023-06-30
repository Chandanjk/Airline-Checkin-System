import React from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";

const FlightDetails = (props) => (
  <>
    <MDBCard style={{ marginTop: "15px" }}>
      <MDBCardHeader
        tag="h3"
        className="text-center font-weight-bold text-uppercase py-4 tempting-azure-gradient"
      >
        Flight Details
      </MDBCardHeader>
      <MDBCardBody className="frozen-dreams-gradient">
        <MDBContainer style={{ borderStyle: "solid", padding: "5px" }}>
          <MDBRow>
            <MDBCol sm="6">
              <b>AIRLINE : </b> {props.flightDetails.airline}
            </MDBCol>
            <MDBCol sm="6">
              <b>FLIGHT No : </b> {props.flightDetails.flightNo}
            </MDBCol>
            <MDBCol sm="6">
              <b>DEP STN : </b> {props.flightDetails.departureStation}
            </MDBCol>
            <MDBCol sm="6">
              <b>ARV STN : </b> {props.flightDetails.arrivalStation}
            </MDBCol>
            <MDBCol sm="6">
              <b>DEP DATE : </b>{" "}
              {props.flightDetails.departureDate.substring(0, 10)}
            </MDBCol>
            <MDBCol sm="6">
              <b>ARV DATE : </b>{" "}
              {props.flightDetails.arrivalDate.substring(0, 10)}
            </MDBCol>
            <MDBCol sm="6">
              <b>DEP TIME : </b>{" "}
              {props.flightDetails.departureDate.substring(11, 16)}
            </MDBCol>
            <MDBCol sm="6">
              <b>ARV TIME : </b>{" "}
              {props.flightDetails.arrivalDate.substring(11, 16)}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  </>
);

FlightDetails.propTypes = {
  flightDetails: PropTypes.object.isRequired,
};

export default FlightDetails;
