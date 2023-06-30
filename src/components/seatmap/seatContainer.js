import React from "react";
import SeatMap from "./seatMap";
import PropTypes from "prop-types";

const SeatContainer = (props) => {
  const bookedSeatMap = props.bookedSeatMap;
  let seats = null;
  if (props.passengerId === "#") {
    seats = Array(60).fill("DISABLED");
  } else {
    seats = Array(60).fill("DISABLED");
    for (let i = 0; i < bookedSeatMap.length; i++) {
      if (bookedSeatMap[i].status === "AC") {
        seats[bookedSeatMap[i].seatNo] = "ACCEPTED";
        if (
          bookedSeatMap[i].wheelChair === "Yes" &&
          bookedSeatMap[i].infant === "Yes"
        ) {
          seats[bookedSeatMap[i].seatNo] = "ACCEPTED WITH WHEELCHAIR INFANT";
        } else if (bookedSeatMap[i].wheelChair === "Yes") {
          seats[bookedSeatMap[i].seatNo] = "ACCEPTED WITH WHEELCHAIR";
        } else if (bookedSeatMap[i].infant === "Yes") {
          seats[bookedSeatMap[i].seatNo] = "ACCEPTED WITH INFANT";
        }
      } else {
        seats[bookedSeatMap[i].seatNo] = "NOT CHECKED";
      }

      if (bookedSeatMap[i].paxId === props.passengerId) {
        seats[bookedSeatMap[i].seatNo] = "MODIFY";
      }
    }
  }
  return <div>{<SeatMap onClick={props.onClick} seats={seats} />}</div>;
};
SeatContainer.propTypes = {
  passengerId: PropTypes.string.isRequired,
  bookedSeatMap: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SeatContainer;
