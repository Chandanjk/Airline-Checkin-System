import React from "react";
import Seat from "../seatmap/seat";
import PropTypes from "prop-types";

const UpdatePassengerSeat = (props) => {
  let seats = null;
  if (props.passengerId === "#") {
    seats = Array(60).fill("DISABLED");
  } else {
    seats = Array(60).fill("MODIFY");
    for (let i = 0; i < props.passengerList.length; i++) {
      if (props.passengerList[i].seat_no.length > 0) {
        seats[props.getSeatNoFromSeatLocation(props.passengerList[i].seat_no)] =
          "DISABLED";
      }
      if (props.passengerList[i].id === Number(props.passengerId)) {
        seats[props.getSeatNoFromSeatLocation(props.passengerList[i].seat_no)] =
          "ACCEPTED";
      }
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
    <table
      style={{
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
  );
};
UpdatePassengerSeat.propTypes = {
  passengerList: PropTypes.array.isRequired,
  passengerId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  getSeatNoFromSeatLocation: PropTypes.func.isRequired,
};

export default UpdatePassengerSeat;
