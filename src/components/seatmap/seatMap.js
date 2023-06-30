import React from "react";
import Seat from "./seat";
import "../../css/seat.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import PropTypes from "prop-types";

const SeatMap = (props) => {
  let seats = props.seats;
  var seatMap = [];
  let row = 1;

  for (let seatIndex = 0; seatIndex < 60; seatIndex += 6) {
    seatMap.push(
      <tr key={row}>
        <td style={{ fontWeight: "bold" }}>{row++}</td>
        <td>
          <Seat
            value={seatIndex}
            disableSeat={seats[seatIndex]}
            onClick={props.onClick}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 1}
            disableSeat={seats[seatIndex + 1]}
            onClick={props.onClick}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 2}
            disableSeat={seats[seatIndex + 2]}
            onClick={props.onClick}
          />
        </td>
        <td>
          <div style={{ width: "8px" }}></div>
        </td>
        <td>
          <Seat
            value={seatIndex + 3}
            disableSeat={seats[seatIndex + 3]}
            onClick={props.onClick}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 4}
            disableSeat={seats[seatIndex + 4]}
            onClick={props.onClick}
          />
        </td>
        <td>
          <Seat
            value={seatIndex + 5}
            disableSeat={seats[seatIndex + 5]}
            onClick={props.onClick}
          />
        </td>
      </tr>
    );
  }

  return (
    <MDBContainer fluid>
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
        }}
        className="cloudy-knoxville-gradient"
      >
        <MDBCol size="5">
          <MDBRow style={{ padding: "5px 3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "#45cafc" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              CHECKED IN
            </span>
          </MDBRow>
          <MDBRow style={{ padding: "3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "rgba(255, 241, 0, 0.85)" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              NOT CHECKED
            </span>
          </MDBRow>
          <MDBRow style={{ padding: "3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "rgba(255,0,255,0.3)" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>MODIFY</span>
          </MDBRow>
        </MDBCol>

        <MDBCol size="7">
          <MDBRow style={{ padding: "5px 3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "green" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              CHECKED WITH W/C & INF
            </span>
          </MDBRow>
          <MDBRow style={{ padding: "3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "red" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              CHECKED WITH W/C
            </span>
          </MDBRow>
          <MDBRow style={{ padding: "3px", textAlign: "center" }}>
            <button
              className="SeatCode"
              style={{ backgroundColor: "blue" }}
              disabled
            ></button>
            <span style={{ fontSize: "13px", fontWeight: "450" }}>
              CHECKED WITH INF
            </span>
          </MDBRow>
        </MDBCol>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            fontStyle: "italic",
            padding: "5px",
            color: "red",
            textAlign: "center",
          }}
        >
          * Select Passenger to enable Seat Map
        </span>
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

SeatMap.propTypes = {
  seats: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SeatMap;
