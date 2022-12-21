import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readParticipant,
  readInstance,
  createInstance,
  listInstances,
  updateInstance,
} from "../../utils/api";
import RecForm from "./RecForm";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function StatusEdit({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [participantId, setParticipantId] = useState("");
  const handleParticipantIdChange = (event) =>
    setParticipantId(event.target.value);

  const [incidentNum, setIncidentNum] = useState(null);
  const handleIncidentNumChange = (event) => setIncidentNum(event.target.value);

  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (event) => setStartDate(event.target.value);

  const [nextCheckDate, setNextCheckDate] = useState(null);
  const handleNextCheckDateChange = (event) =>
    setNextCheckDate(event.target.value);

  const [Yr1Fed, setYr1Fed] = useState("");
  const handleYr1FedChange = (event) => setYr1Fed(event.target.value);

  const [Yr1State, setYr1State] = useState("");
  const handleYr1StateChange = (event) => setYr1State(event.target.value);

  const [Yr1Note, setYr1Note] = useState("");
  const handleYr1NoteChange = (event) => setYr1Note(event.target.value);

  const [Yr2Fed, setYr2Fed] = useState("");
  const handleYr2FedChange = (event) => setYr2Fed(event.target.value);

  const [Yr2State, setYr2State] = useState("");
  const handleYr2StateChange = (event) => setYr2State(event.target.value);

  const [Yr2Note, setYr2Note] = useState("");
  const handleYr2NoteChange = (event) => setYr2Note(event.target.value);

  const [Yr3Fed, setYr3Fed] = useState("");
  const handleYr3FedChange = (event) => setYr3Fed(event.target.value);

  const [Yr3State, setYr3State] = useState("");
  const handleYr3StateChange = (event) => setYr3State(event.target.value);

  const [Yr3Note, setYr3Note] = useState("");
  const handleYr3NoteChange = (event) => setYr3Note(event.target.value);

  const [Yr4Fed, setYr4Fed] = useState("");
  const handleYr4FedChange = (event) => setYr4Fed(event.target.value);

  const [Yr4State, setYr4State] = useState("");
  const handleYr4StateChange = (event) => setYr4State(event.target.value);

  const [Yr4Note, setYr4Note] = useState("");
  const handleYr4NoteChange = (event) => setYr4Note(event.target.value);

  const [Yr5Fed, setYr5Fed] = useState("");
  const handleYr5FedChange = (event) => setYr5Fed(event.target.value);

  const [Yr5State, setYr5State] = useState("");
  const handleYr5StateChange = (event) => setYr5State(event.target.value);

  const [Yr5Note, setYr5Note] = useState("");
  const handleYr5NoteChange = (event) => setYr5Note(event.target.value);

  //State vars for error message
  const [errMessage, setErrMessage] = useState("");
  const [visibility3, setVisibility3] = useState(null);

  //Create instance of useHistory hook
  const history = useHistory();

  //Get participantId from url
  const { instanceId } = useParams();
  const instance_id = instanceId;
  console.log("instance id", instance_id);

  //Load instance
  //Make an API Call to get the participant on the participant_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setIncidentNum(response.incident_num);
      setParticipantId(response.participant_id);
      if (response.start_date)
        setStartDate(response.start_date.substring(0, 10));
      if (response.next_check_date)
        setNextCheckDate(response.next_check_date.substring(0, 10));
      setYr1Fed(response["1_YR_Fed"]);
      setYr1State(response["1_YR_State"]);
      setYr1Note(response["1_YR_Note"]);
      setYr2Fed(response["2_YR_Fed"]);
      setYr2State(response["2_YR_State"]);
      setYr2Note(response["2_YR_Note"]);
      setYr3Fed(response["3_YR_Fed"]);
      setYr3State(response["3_YR_State"]);
      setYr3Note(response["3_YR_Note"]);
      setYr4Fed(response["4_YR_Fed"]);
      setYr4State(response["4_YR_State"]);
      setYr4Note(response["4_YR_Note"]);
      setYr5Fed(response["5_YR_Fed"]);
      setYr5State(response["5_YR_State"]);
      setYr5Note(response["5_YR_Note"]);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Create the handleSubmit function to update the deck
  //This function creates a reservation based on the user input and then uses changeReservation() api call
  async function handleSubmit(event) {
    event.preventDefault();

    let participant = {
      data: {},
    };

    participant.data.instance_id = Number(instanceId);
    participant.data.participant_id = Number(participantId);
    participant.data.next_check_date = nextCheckDate;
    participant.data["1_YR_Fed"] = Yr1Fed;
    participant.data["1_YR_State"] = Yr1State;
    participant.data["1_YR_Note"] = Yr1Note;
    participant.data["2_YR_Fed"] = Yr2Fed;
    participant.data["2_YR_State"] = Yr2State;
    participant.data["2_YR_Note"] = Yr2Note;
    participant.data["3_YR_Fed"] = Yr3Fed;
    participant.data["3_YR_State"] = Yr3State;
    participant.data["3_YR_Note"] = Yr3Note;
    participant.data["4_YR_Fed"] = Yr4Fed;
    participant.data["4_YR_State"] = Yr4State;
    participant.data["4_YR_Note"] = Yr4Note;
    participant.data["5_YR_Fed"] = Yr5Fed;
    participant.data["5_YR_State"] = Yr5State;
    participant.data["5_YR_Note"] = Yr5Note;

    //Log participant
    console.log("participant", participant);

    //Make api call to update reservation
    async function editInstance(participant) {
      try {
        const response = await updateInstance(participant);
        console.log(response);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await editInstance(participant);

    alert("Instance Updated Successfully");
    //Go back to dashboard page
    // history.push(`/participants/dashboard`);
  }

  //Create the handleCancel function to return the user to the previous page
  const handleCancel = (event) => {
    history.push(`/dashboard`);
  };

  //Return the form to enter the reservation details
  return (
    <main>
      <h1>Edit Recidivism Information</h1>
      <RecForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        incidentNum={incidentNum}
        handleIncidentNumChange={handleIncidentNumChange}
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        nextCheckDate={nextCheckDate}
        handleNextCheckDateChange={handleNextCheckDateChange}
        Yr1Fed={Yr1Fed}
        handleYr1FedChange={handleYr1FedChange}
        Yr1State={Yr1State}
        handleYr1StateChange={handleYr1StateChange}
        Yr1Note={Yr1Note}
        handleYr1NoteChange={handleYr1NoteChange}
        Yr2Fed={Yr2Fed}
        handleYr2FedChange={handleYr2FedChange}
        Yr2State={Yr2State}
        handleYr2StateChange={handleYr2StateChange}
        Yr2Note={Yr2Note}
        handleYr2NoteChange={handleYr2NoteChange}
        Yr3Fed={Yr3Fed}
        handleYr3FedChange={handleYr3FedChange}
        Yr3State={Yr3State}
        handleYr3StateChange={handleYr3StateChange}
        Yr3Note={Yr3Note}
        handleYr3NoteChange={handleYr3NoteChange}
        Yr4Fed={Yr4Fed}
        handleYr4FedChange={handleYr4FedChange}
        Yr4State={Yr4State}
        handleYr4StateChange={handleYr4StateChange}
        Yr4Note={Yr4Note}
        handleYr4NoteChange={handleYr4NoteChange}
        Yr5Fed={Yr5Fed}
        handleYr5FedChange={handleYr5FedChange}
        Yr5State={Yr5State}
        handleYr5StateChange={handleYr5StateChange}
        Yr5Note={Yr5Note}
        handleYr5NoteChange={handleYr5NoteChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default StatusEdit;
