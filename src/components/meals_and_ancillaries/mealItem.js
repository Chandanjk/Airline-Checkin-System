import React from "react";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const MealItem = (props) => {
  return (
    <MDBCard style={{ marginTop: "2px" }}>
      <MDBCardHeader
        tag="h6"
        className="text-center fontweight-bold text-uppercase py-3"
      >
        <MDBRow>
          <MDBCol>
            <input
              onChange={props.selectMealItem}
              checked={props.service === "Meal" ? true : false}
              type="radio"
              id="radio1"
              value="Meal"
            />
            <b>Meal</b>
          </MDBCol>
          <MDBCol>
            <input
              onChange={props.selectAncillary}
              checked={props.service === "Ancillary" ? true : false}
              type="radio"
              id="radio1"
              value="Ancillary"
            />
            <b>Ancillary</b>
          </MDBCol>
        </MDBRow>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBContainer>
          <form onSubmit={props.handleSubmit}>
            <MDBRow>
              <MDBCol size="6">
                <input
                  type="text"
                  id="MealItem"
                  className="form-control"
                  onChange={props.handleChange}
                  value={props.newItem}
                  placeholder="Enter Item"
                />
              </MDBCol>
              <MDBCol size="5">
                <button className="btn btn-success" type="submit">
                  Add
                </button>
              </MDBCol>
            </MDBRow>
          </form>
          <MDBRow className="py-3">
            {props.items.map((item, index) => (
              <button
                key={index}
                className="btn btn-outline-secondary"
                value={item}
                onClick={props.handleRemove}
              >
                {item}
              </button>
            ))}
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

MealItem.propTypes = {
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  selectMealItem: PropTypes.func.isRequired,
  selectAncillary: PropTypes.func.isRequired,
  service: PropTypes.string.isRequired,
  newItem: PropTypes.string.isRequired,
};

export default MealItem;
