import React from "react";
import FlightDetails from "../components/flights/flightDetails";
import { flights_data } from "../../tools/mockData";
import * as renderer from "react-test-renderer";

it("Renders flight details", () => {
  const tree = renderer.create(
    <FlightDetails flightDetails={flights_data[0]} />
  );
  expect(tree).toMatchSnapshot();
});
