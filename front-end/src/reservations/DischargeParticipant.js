import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readInstance,
  updateInstance,
  readParticipant,
  createInstance,
} from "../utils/api";
import DischargeForm from "./DischargeForm";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function DischargeParticipant({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [startDate, setStartDate] = useState("");
  const handleStartDateChange = (event) => setStartDate(event.target.value);

  const [dischargeDate, setDischargeDate] = useState(null);
  const handleDischargeDateChange = (event) =>
    setDischargeDate(event.target.value);

  const [dischargeReason, setDischargeReason] = useState("");
  const handleDischargeReasonChange = (event) =>
    setDischargeReason(event.target.value);

  const [gotChecking, setGotChecking] = useState("");
  const handleGotCheckingChange = (event) => setGotChecking(event.target.value);

  const [gotLicense, setGotLicense] = useState("");
  const handleGotLicenseChange = (event) => setGotLicense(event.target.value);

  const [gotSavings, setGotSavings] = useState("");
  const handleGotSavingsChange = (event) => setGotSavings(event.target.value);

  const [programUtilization, setProgramUtilization] = useState("Successful");
  const handleProgramUtilizationChange = (event) => {
    setProgramUtilization(event.target.value);
    console.log("programUtilization", programUtilization);
  };

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

  //Load participant
  //Make an API Call to get the participant on the participant_id

  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      let startDateString = response.start_date.substring(0, 10);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setStartDate(startDateString);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Create the handleSubmit function to update the deck
  //This function creates a reservation based on the user input and then uses changeReservation() api call
  async function handleSubmit(event) {
    console.log("beforeSubmit", programUtilization);
    console.log(typeof dischargeDate, "dischargeDate", dischargeDate);
    event.preventDefault();

    //To change discharge date into next_check_date
    function addOneYear(input) {
      const year = Number(input.substring(0, 4)) + 1;
      console.log("return value", year + input.substring(4));
      return year + input.substring(4);
    }

    let instance = {
      data: {},
    };

    instance.data.instance_id = instanceId;
    instance.data.discharge_date = dischargeDate;
    instance.data.discharge_reason = dischargeReason;
    instance.data.got_checking = gotChecking;
    instance.data.got_license = gotLicense;
    instance.data.got_savings = gotSavings;
    instance.data.program_utilization = programUtilization;
    instance.data.housing_transition = housingTransition;
    instance.data.status_at_discharge = dischargeStatus;
    instance.data.currently_in_program = "no";
    instance.data.next_check_date = addOneYear(dischargeDate);

    //Log participant
    console.log("instance", instance);

    //Make api call to update instance
    async function updateDischargeInfo(updatedInstance) {
      try {
        const response = await updateInstance(updatedInstance);
        console.log(response);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await updateDischargeInfo(instance);

    alert("Participant Discharged Successfully");
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
      <h1>Discharge Participant</h1>
      <DischargeForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        dischargeDate={dischargeDate}
        handleDischargeDateChange={handleDischargeDateChange}
        dischargeReason={dischargeReason}
        handleDischargeReasonChange={handleDischargeReasonChange}
        gotChecking={gotChecking}
        handleGotCheckingChange={handleGotCheckingChange}
        gotLicense={gotLicense}
        handleGotLicenseChange={handleGotLicenseChange}
        gotSavings={gotSavings}
        handleGotSavingsChange={handleGotSavingsChange}
        programUtilization={programUtilization}
        handleProgramUtilizationChange={handleProgramUtilizationChange}
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

export default DischargeParticipant;
