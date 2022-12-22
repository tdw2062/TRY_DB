import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readParticipant,
  readInstance,
  createInstance,
  listInstances,
  updateInstance,
} from "../../utils/api";
import DischargeForm from "./DischargeForm";

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

  const [gotChecking, setGotChecking] = useState("");
  const handleGotCheckingChange = (event) => setGotChecking(event.target.value);

  const [gotLicense, setGotLicense] = useState("");
  const handleGotLicenseChange = (event) => setGotLicense(event.target.value);

  const [gotSavings, setGotSavings] = useState("");
  const handleGotSavingsChange = (event) => setGotSavings(event.target.value);

  const [programUtilization, setProgramUtilization] = useState("");
  const handleProgramUtilizationChange = (event) =>
    setProgramUtilization(event.target.value);

  const [dischargeDate, setDischargeDate] = useState(null);
  const handleDischargeDateChange = (event) =>
    setDischargeDate(event.target.value);

  const [dischargeReason, setDischargeReason] = useState("");
  const handleDischargeReasonChange = (event) =>
    setDischargeReason(event.target.value);

  const [housingTransition, setHousingTransition] = useState("");
  const handleHousingTransitionChange = (event) =>
    setHousingTransition(event.target.value);

  const [dischargeStatus, setDischargeStatus] = useState("");
  const handleDischargeStatusChange = (event) =>
    setDischargeStatus(event.target.value);

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
      if (response.discharge_date)
        setDischargeDate(response.discharge_date.substring(0, 10));
      setGotChecking(response.got_checking);
      setGotLicense(response.got_license);
      setGotSavings(response.got_savings);
      setProgramUtilization(response.program_utilization);
      setDischargeDate(response.discharge_date);
      setDischargeReason(response.discharge_reason);
      setHousingTransition(response.housing_transition);
      setDischargeStatus(response.status_at_discharge);
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
    participant.data.got_checking = gotChecking;
    participant.data.got_license = gotLicense;
    participant.data.got_savings = gotSavings;
    participant.data.program_utilization = programUtilization;
    participant.data.discharge_date = dischargeDate;
    participant.data.discharge_reason = dischargeReason;
    participant.data.housing_transition = housingTransition;
    participant.data.status_at_discharge = dischargeStatus;

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
      <h1>Edit Discharge Information</h1>
      <DischargeForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        instanceId={instanceId}
        incidentNum={incidentNum}
        handleIncidentNumChange={handleIncidentNumChange}
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        gotChecking={gotChecking}
        handleGotCheckingChange={handleGotCheckingChange}
        gotLicense={gotLicense}
        handleGotLicenseChange={handleGotLicenseChange}
        gotSavings={gotSavings}
        handleGotSavingsChange={handleGotSavingsChange}
        programUtilization={programUtilization}
        handleProgramUtilizationChange={handleProgramUtilizationChange}
        dischargeDate={dischargeDate}
        handleDischargeDateChange={handleDischargeDateChange}
        dischargeReason={dischargeReason}
        handleDischargeReasonChange={handleDischargeReasonChange}
        housingTransition={housingTransition}
        handleHousingTransitionChange={handleHousingTransitionChange}
        dischargeStatus={dischargeStatus}
        handleDischargeStatusChange={handleDischargeStatusChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default StatusEdit;
