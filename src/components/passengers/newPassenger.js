import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";

const NewPassenger = (props) => {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => {
    setGridModal(!gridModal);
  };

  let isSubmitBtnEnable =
    props.passengerDetails.first_name.length > 0 &&
    props.passengerDetails.last_name.length > 0 &&
    props.passengerDetails.mobile_no.length > 0;

  return (
    <MDBContainer>
      <button className="btn btn-primary" onClick={toggleShow}>
        Add
      </button>

      <MDBModal tabIndex="-1" show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="text-center" tag="h5">
              <b>New Passenger</b>
            </MDBModalHeader>
            <MDBModalBody>
              <form
                className="needs-validation"
                onSubmit={props.submitHandler}
                noValidate
              >
                <MDBRow style={{ padding: "10px" }}>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="first_name"
                        onChange={props.changeHandler}
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="last_name"
                        onChange={props.changeHandler}
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ padding: "10px" }}>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="mobile_no"
                        onChange={props.changeHandler}
                        type="number"
                        id="mobile_no"
                        placeholder="Mobile"
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="date_of_birth"
                        onChange={props.changeHandler}
                        type="text"
                        id="date_of_birth"
                        placeholder="Date of Birth"
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ padding: "10px" }}>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="passport"
                        onChange={props.changeHandler}
                        type="text"
                        id="passport"
                        placeholder="Passport"
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInputGroup>
                      <input
                        className="form-control"
                        name="address"
                        onChange={props.changeHandler}
                        type="text"
                        id="address"
                        placeholder="Address"
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ padding: "10px" }}>
                  <MDBCol md="6">
                    <MDBRow style={{ fontSize: "13px" }}>
                      <MDBCol md="3">Gender: </MDBCol>
                      <MDBCol md="4">
                        <input
                          onChange={props.selectGender}
                          checked={
                            props.passengerDetails.gender === "Male"
                              ? true
                              : false
                          }
                          type="radio"
                          id="radio1"
                          value="Male"
                        />
                        <b>Male</b>
                      </MDBCol>
                      <MDBCol md="5">
                        <input
                          onChange={props.selectGender}
                          checked={
                            props.passengerDetails.gender === "Female"
                              ? true
                              : false
                          }
                          type="radio"
                          id="radio2"
                          value="Female"
                        />
                        <b>Female</b>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBRow style={{ fontSize: "13px" }}>
                      <MDBCol md="1">
                        <input
                          type="checkbox"
                          id="infant"
                          onClick={props.hasInfant}
                        />
                      </MDBCol>
                      <MDBCol md="3">
                        <b>Infant</b>
                      </MDBCol>
                      <MDBCol md="1">
                        <input
                          type="checkbox"
                          id="wheelChair"
                          onClick={props.wheelChairRequired}
                        />
                      </MDBCol>
                      <MDBCol md="3">
                        <b>WheelChair</b>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBModalFooter>
                  <MDBRow className="text-center">
                    <MDBCol md="6">
                      <button className="btn btn-danger" onClick={toggleShow}>
                        CANCEL
                      </button>
                    </MDBCol>
                    <MDBCol md="6">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={toggleShow}
                        disabled={!isSubmitBtnEnable}
                      >
                        ADD
                      </button>
                    </MDBCol>
                  </MDBRow>
                </MDBModalFooter>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

NewPassenger.propTypes = {
  passengerDetails: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  selectGender: PropTypes.func.isRequired,
  hasInfant: PropTypes.func.isRequired,
  wheelChairRequired: PropTypes.func.isRequired,
};

export default NewPassenger;
