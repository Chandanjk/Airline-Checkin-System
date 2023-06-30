import React from "react";
import Seat from "../seatmap/seat";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const SeatMapSpecialMeals = (props) => {
  let seats = Array(60).fill("NO SP MEAL");
  for (let i = 0; i < props.passengerList.length; i++) {
    if (props.passengerList[i].special_meals.length > 0) {
      seats[props.getSeatNoFromSeatLocation(props.passengerList[i].seat_no)] =
        "SP MEAL";
    }
  }

  let seatMap = [];
  let row = 1;

  for (let seatIndex = 0; seatIndex < 60; seatIndex += 6) {
    seatMap.push(
      <tr key={row}>
        <td style={{ fontWeight: "bold" }}>{row++}</td>
        <td>
          <Seat
            value={seatIndex}
            disableSeat={seats[seatIndex]}
            onClick={() => {}}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 1}
            disableSeat={seats[seatIndex + 1]}
            onClick={() => {}}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 2}
            disableSeat={seats[seatIndex + 2]}
            onClick={() => {}}
          />
        </td>
        <td>
          <div style={{ width: "8px" }}></div>
        </td>
        <td>
          <Seat
            value={seatIndex + 3}
            disableSeat={seats[seatIndex + 3]}
            onClick={() => {}}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 4}
            disableSeat={seats[seatIndex + 4]}
            onClick={() => {}}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 5}
            disableSeat={seats[seatIndex + 5]}
            onClick={() => {}}
          />
        </td>
      </tr>
    );
  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="12">
          <div style={{ textAlign: "center", padding: "7px" }}>
            <h3>SEAT MAP</h3>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow
        style={{
          borderStyle: "solid solid none solid",
          borderRadius: "11px",
          marginTop: "5px",
        }}
        className="cloudy-knoxville-gradient"
      >
        <MDBCol size="6">
          <MDBRow style={{ padding: "5px 3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "green" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              SP Meal Req
            </span>
          </MDBRow>
        </MDBCol>

        <MDBCol size="6">
          <MDBRow style={{ padding: "5px 3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "rgba(255, 241, 0, 0.85)" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              SP Meal not Req
            </span>
          </MDBRow>
        </MDBCol>
      </MDBRow>

      <MDBRow
        style={{
          borderStyle: "solid",
          padding: "20px",
          borderRadius: "11px",
          textAlign: "center",
          overflowX: "auto",
          overflowY: "auto",
          height: "380px",
        }}
        className="cloudy-knoxville-gradient"
      >
        <table
          style={{
            height: "320px",
            margin: "0 auto",
            width: "100px",
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "center" }}>A</th>
              <th style={{ textAlign: "center" }}>B</th>
              <th style={{ textAlign: "center" }}>C</th>
              <th style={{ textAlign: "center" }}> </th>
              <th style={{ textAlign: "center" }}>D</th>
              <th style={{ textAlign: "center" }}>E</th>
              <th style={{ textAlign: "center" }}>F</th>
            </tr>
          </thead>
          <tbody>{seatMap}</tbody>
        </table>
      </MDBRow>
    </MDBContainer>
  );
};
SeatMapSpecialMeals.propTypes = {
  passengerList: PropTypes.array.isRequired,
  getSeatNoFromSeatLocation: PropTypes.func.isRequired,
};

export default SeatMapSpecialMeals;
