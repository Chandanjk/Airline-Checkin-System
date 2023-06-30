import React from "react";
import "../../css/seat.css";
import PropTypes from "prop-types";

const Seat = (props) => {
  switch (props.disableSeat) {
    case "DISABLED":
      return (
        <p
          value={props.value}
          className="Seat"
          disabled
          style={{ backgroundColor: "gray" }}
        ></p>
      );
    case "MODIFY":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          style={{ backgroundColor: "rgba(255,0,255,0.3)" }}
        ></button>
      );
    case "ACCEPTED":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "#45cafc" }}
        ></button>
      );
    case "ACCEPTED WITH WHEELCHAIR INFANT":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "green" }}
        ></button>
      );
    case "ACCEPTED WITH WHEELCHAIR":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "red" }}
        ></button>
      );
    case "ACCEPTED WITH INFANT":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "blue" }}
        ></button>
      );
    case "NOT CHECKED":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "rgba(255, 241, 0, 0.85)" }}
        ></button>
      );
    case "NO SP MEAL":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "rgba(255, 241, 0, 0.85)" }}
        ></button>
      );
    case "SP MEAL":
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "green" }}
        ></button>
      );
    default:
      return (
        <button
          value={props.value}
          className="Seat"
          onClick={props.onClick}
          disabled
          style={{ backgroundColor: "rgba(255,255,71,0.2)" }}
        ></button>
      );
  }
};

Seat.propTypes = {
  value: PropTypes.number.isRequired,
  disableSeat: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Seat;
