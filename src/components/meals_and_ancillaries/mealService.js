import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
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

const MealService = (props) => {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => {
    setGridModal(!gridModal);
    props.updateToPreviousMealItem();
  };

  const updateAndClose = () => {
    setGridModal(!gridModal);
    let mealItems = [];
    for (let i = 0; i < props.passengerMealItems.length; i++) {
      if (props.passengerMealItems[i]) {
        mealItems.push(props.flight.special_meals[i]);
      }
    }
    let selectedPassenger = props.passengerList.find(
      (passenger) => passenger.id === Number(props.selectedPassengerId)
    );
    selectedPassenger = {
      ...selectedPassenger,
      special_meals: mealItems,
    };
    props
      .updatePassenger(selectedPassenger)
      .then(() => {
        console.log("Passenger Meal Updated");
        toast.success("Passenger Meal Updated");
      })
      .catch((error) => {
        console.log("Failed : " + error);
        toast.error("Passenger Meal Updation Failed");
      });
  };

  return (
    <MDBContainer>
      <button
        className="btn btn-primary"
        onClick={toggleShow}
        disabled={props.selectedPassengerId === "#"}
      >
        Meal
      </button>
      <MDBModal tabIndex="-1" show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="text-center" tag="h5">
              <b>Meal Items</b>
            </MDBModalHeader>
            <MDBModalBody>
              {props.flight.special_meals &&
                props.flight.special_meals.map((item, index) => {
                  return (
                    <MDBRow key={index}>
                      <MDBCol md="6" className="text-center">
                        <input
                          type="checkbox"
                          id={index}
                          value={item}
                          checked={props.passengerMealItems[index]}
                          onChange={props.updatepassengerMealItems}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <b>{item}</b>
                      </MDBCol>
                    </MDBRow>
                  );
                })}
            </MDBModalBody>
            <MDBModalFooter>
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

MealService.propTypes = {
  passengerList: PropTypes.array.isRequired,
  flight: PropTypes.object.isRequired,
  selectedPassengerId: PropTypes.string.isRequired,
  passengerMealItems: PropTypes.array.isRequired,
  updatepassengerMealItems: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  updateToPreviousMealItem: PropTypes.func.isRequired,
};

export default MealService;
