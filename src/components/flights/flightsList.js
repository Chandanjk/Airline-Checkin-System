import React from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/flightListPage.css";

const FlightsList = (props) => (
  <>
    <div className="table-responsive-xxl">
      <div className="table-title">
        <h3>Flights List</h3>
      </div>
      <table className="table-fill">
        <thead>
          <tr className="table-row">
            <th className="table-head text-left"># </th>
            <th className="table-head text-left">Airline</th>
            <th className="table-head text-left">Flight Number</th>
            <th className="table-head text-left">Departure Station</th>
            <th className="table-head text-left">Arrival Station</th>
            <th className="table-head text-left">Date</th>
            <th className="table-head text-left">Time</th>
            <th className="table-head text-left"></th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {props.flightsList &&
            props.flightsList.map((flight, index) => {
              return (
                <tr key={index} className="table-row">
                  <td className="table-data text-left">{index + 1} </td>
                  <td className="table-data text-left">{flight.airline}</td>
                  <td className="table-data text-left">{flight.flightNo}</td>
                  <td className="table-data text-left">
                    {flight.departureStation}
                  </td>
                  <td className="table-data text-left">
                    {flight.arrivalStation}
                  </td>
                  <td className="table-data text-left">
                    {flight.departureDate.substring(0, 10)}
                  </td>
                  <td className="table-data text-left">
                    {flight.departureDate.substring(11, 16)}
                  </td>
                  <td className="table-data text-center">
                    <Link to={"/checkin/" + flight.id} className="btn btn-link">
                      Check-In
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </>
);

FlightsList.propTypes = {
  flightsList: PropTypes.array.isRequired,
};

export default FlightsList;
