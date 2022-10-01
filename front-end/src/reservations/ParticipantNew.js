import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readParticipant, createParticipant } from "../utils/api";
import ParticipantNewForm from "./ParticipantNewForm";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ParticipantNew({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [dob, setDob] = useState(null);
  const handleDobChange = (event) => setDob(event.target.value);

  //State vars for error message
  const [errMessage, setErrMessage] = useState("");
  const [visibility3, setVisibility3] = useState(null);

  //Create instance of useHistory hook
  const history = useHistory();

  //Create the handleSubmit function to update the deck
  //This function creates a reservation based on the user input and then uses changeReservation() api call
  async function handleSubmit(event) {
    event.preventDefault();

    let participant_id;

    let participant = {
      data: {},
    };

    participant.data.first_name = firstName;
    participant.data.last_name = lastName;
    participant.data.dob = dob;

    //Make api call to update reservation
    async function newParticipant(participant) {
      try {
        const response = await createParticipant(participant);
        participant_id = response.participant_id;
        console.log("Here is the response", participant_id);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await newParticipant(participant);

    alert("Participant Enrolled Successfully");
    //Go back to dashboard page
    history.push(`/participants/${participant_id}/enrollNew`);
  }

  //Create the handleCancel function to return the user to the previous page
  const handleCancel = (event) => {
    history.push(`/dashboard`);
  };

  //Return the form to enter the reservation details
  return (
    <main>
      <h1>Enroll New Participant</h1>
      <ParticipantNewForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        dob={dob}
        handleDobChange={handleDobChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default ParticipantNew;
