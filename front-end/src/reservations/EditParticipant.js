import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readReservation,
  updateReservation,
  readParticipant,
  updateParticipant,
} from "../utils/api";
import ResForm from "./ResForm";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function EditParticipant({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [mobileNumber, setMobileNumber] = useState("");
  const handleMobileNumberChange = (event) =>
    setMobileNumber(event.target.value);

  //State vars for error message
  const [errMessage, setErrMessage] = useState("");
  const [visibility3, setVisibility3] = useState(null);

  //Get ParticipantId from url
  const { participantId } = useParams();

  //Create instance of useHistory hook
  const history = useHistory();

  //Make an API Call to get the reservation based on the reservation_id
  useEffect(() => {
    async function getParticipant(participantId) {
      const response = await readParticipant(participantId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setMobileNumber(response.mobile_number);
    }
    getParticipant(participantId);
  }, [participantId]);

  //Create the handleSubmit function to update the deck
  //This function creates a reservation based on the user input and then uses changeReservation() api call
  async function handleSubmit(event) {
    event.preventDefault();

    let participant = {
      data: {},
    };

    participant.data.participant_id = participantId;
    participant.data.first_name = firstName;
    participant.data.last_name = lastName;
    participant.data.mobile_number = mobileNumber;

    //Make api call to update reservation
    async function changeParticipant(participant) {
      try {
        const response = await updateParticipant(participant);
        console.log(response);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await changeParticipant(participant);

    //Reset fields
    setFirstName("");
    setLastName("");
    setMobileNumber("");

    //Go back to dashboard page
    history.push(`/dashboard`);
  }

  //Create the handleCancel function to return the user to the previous page
  const handleCancel = (event) => {
    history.push(`/dashboard`);
  };

  //Return the form to enter the reservation details
  return (
    <main>
      <h1>Edit Participant</h1>
      <ResForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        mobileNumber={mobileNumber}
        handleMobileNumberChange={handleMobileNumberChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default EditParticipant;
