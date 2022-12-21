import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, createParticipant } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ErrorCaught from "../ErrorCaught";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function NewReservation({ date }) {
  //Create state variables and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [mobileNumber, setMobileNumber] = useState("");
  const handleMobileNumberChange = (event) =>
    setMobileNumber(event.target.value);

  //Set visibility for the different types of errors that can occur
  const [visibilityError, setVisibilityError] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Create instance of useHistory hook
  const history = useHistory();

  //Create switched
  let switched = null;

  //Create the handleSubmit function which creates a reservation based on the input and
  //makes an api call to add that reservation to the database
  const handleSubmit = (event) => {
    switched = null;

    event.preventDefault();

    //Validate the input
    validate();

    if (!switched) {
      let participant = {
        data: {},
      };

      //Set state variables
      participant.data.first_name = firstName;
      participant.data.last_name = lastName;
      participant.data.mobile_number = mobileNumber;

      //Make api call to create a new reservation
      async function newParticipant(participant) {
        try {
          const response = await createParticipant(participant);
        } catch (err) {
          console.log("Error making createReservation API call", err);
          setErrMessage(err);
          setVisibilityError(true);
        }
      }
      newParticipant(participant);

      history.push(`/`);
    }
  };

  //The validate function ensures that the reservation is not in the past, on a Tuesday,
  //or before 10:00AM or after 9:30PM
  const validate = () => {
    //Reset visibility
    setVisibilityError(null);

    //If firstName, lastName, or mobileNumber are missing, throw an error
    if (!firstName || !lastName || !mobileNumber) {
      setVisibilityError(true);
      switched = true;
    }
  };

  //Create the handleCancel function to cancel and return to the homepage1
  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  //Return the form with inputs to create a new reservation
  return (
    <main>
      <h1>Add a New Program Participant</h1>

      <ErrorCaught visibility3={visibilityError} msg={errMessage} />
    </main>
  );
}

export default NewReservation;
