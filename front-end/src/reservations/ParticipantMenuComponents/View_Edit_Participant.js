//This component is used to view and edit the info for a
//specific participant (name, dob)

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readParticipant, updateParticipant } from "../../utils/api";
import ParticipantNewForm from "../ParticipantNewForm";

import ErrorAlert from "../../layout/ErrorAlert";

function View_Edit_Participant() {
  //Create state variables for each participant and add event listeners
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

  //Get participantId from url
  const { participantId } = useParams();
  console.log("participantId", participantId);

  //Load Participant
  //Make an API Call to get the participant on the participant_id
  useEffect(() => {
    async function getParticipant(participantId) {
      const response = await readParticipant(participantId);
      console.log("participantRetrieved", response);
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setDob(response.dob.substring(0, 10));
    }
    getParticipant(participantId);
  }, [participantId]);

  //Create the handleSubmit function to update the deck
  //This function updates a participant based on the input
  async function handleSubmit(event) {
    event.preventDefault();

    let participant = {
      data: {},
    };

    participant.data.participant_id = participantId;
    participant.data.first_name = firstName;
    participant.data.last_name = lastName;
    participant.data.dob = dob;

    console.log("participantToSend", participant);

    //Make api call to update participant
    async function editParticipant(participant) {
      try {
        const response = await updateParticipant(participant);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await editParticipant(participant);

    alert("Participant Enrolled Successfully");
    //Go back to dashboard page
    //history.push(`/participants/${participantId}/enrollNew`);
  }

  //Create the handleCancel function to return the user to the previous page
  const handleCancel = (event) => {
    history.push(`/dashboard`);
  };

  //Show the participant form
  return (
    <main>
      <h1>View/Edit Participant Info</h1>
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

export default View_Edit_Participant;
