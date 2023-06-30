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

const UpdatePassengerDetails = (props) => {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => {
    setGridModal(!gridModal);
  };

  return (
    <MDBContainer>
      <button
        className="btn btn-primary"
        onClick={toggleShow}
        disabled={props.passengerDetails.selectedPassengerId === "#"}
      >
        Update
      </button>

      <MDBModal tabIndex="-1" show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="text-center" tag="h5">
              <b>Update Passenger Details</b>
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
                        value={props.passengerDetails.first_name}
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
                        value={props.passengerDetails.last_name}
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
                        value={props.passengerDetails.mobile_no}
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
                        value={props.passengerDetails.date_of_birth}
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
                        value={props.passengerDetails.passport}
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
                        value={props.passengerDetails.address}
                        name="address"
                        onChange={props.changeHandler}
                        type="text"
                        id="address"
                        placeholder="Address"
                      />
                    </MDBInputGroup>
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
                      >
                        UPDATE
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

UpdatePassengerDetails.propTypes = {
  passengerDetails: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default UpdatePassengerDetails;
