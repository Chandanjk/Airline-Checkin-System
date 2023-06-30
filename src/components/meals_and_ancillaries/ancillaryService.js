import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

const AncillaryService = (props) => {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => {
    setGridModal(!gridModal);
    props.updateToPreviousAncillaryServices();
  };

  const updateAndClose = () => {
    setGridModal(!gridModal);
    let Ancillaries = [];
    for (let i = 0; i < props.passengerAncillaryService.length; i++) {
      if (props.passengerAncillaryService[i]) {
        Ancillaries.push(props.flight.ancillary[i]);
      }
    }
    let selectedPassenger = props.passengerList.find(
      (passenger) => passenger.id === Number(props.selectedPassengerId)
    );
    selectedPassenger = {
      ...selectedPassenger,
      ancillary: Ancillaries,
    };
    props
      .updatePassenger(selectedPassenger)
      .then(() => {
        console.log("Passenger Ancillaries Updated");
        toast.success("Passenger Ancillaries Updated");
      })
      .catch((error) => {
        console.log("Failed : " + error);
        toast.error("Passenger Ancillaries Updation Failed");
      });
  };

  return (
    <MDBContainer>
      <button
        className="btn btn-primary"
        onClick={toggleShow}
        disabled={props.selectedPassengerId === "#"}
      >
        Ancillary
      </button>
      <MDBModal show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="text-center" tag="h5">
              <b>Ancillary Service</b>
            </MDBModalHeader>
            <MDBModalBody>
              {props.flight.ancillary &&
                props.flight.ancillary.map((item, index) => {
                  return (
                    <MDBRow key={index}>
                      <MDBCol md="6" className="text-center">
                        <input
                          type="checkbox"
                          id={index}
                          value={item}
                          checked={props.passengerAncillaryService[index]}
                          onChange={props.updatePassengerAncillaryService}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <b>{item}</b>
                      </MDBCol>
                    </MDBRow>
                  );
                })}
            </MDBModalBody>
            <MDBModalFooter className="text-center">
              <MDBRow className="text-center">
                <MDBCol md="6">
                  <button className="btn btn-danger" onClick={toggleShow}>
                    CANCEL
                  </button>
                </MDBCol>
                <MDBCol md="6">
                  <button className="btn btn-success" onClick={updateAndClose}>
                    UPDATE
                  </button>
                </MDBCol>
              </MDBRow>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

AncillaryService.propTypes = {
  passengerList: PropTypes.array.isRequired,
  flight: PropTypes.object.isRequired,
  selectedPassengerId: PropTypes.string.isRequired,
  passengerAncillaryService: PropTypes.array.isRequired,
  updatePassengerAncillaryService: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  updateToPreviousAncillaryServices: PropTypes.func.isRequired,
};

export default AncillaryService;
