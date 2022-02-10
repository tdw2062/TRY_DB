import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readReservation,
  updateReservation,
  readParticipant,
  updateParticipant,
} from "../utils/api";
import EnrollForm from "./ResForm";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function EnrollParticipant({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => setGender(event.target.value);

  const [dob, setDob] = useState("");
  const handleDobChange = (event) => setDob(event.target.value);

  const [homeCounty, setHomeCounty] = useState("");
  const handleHomeCountyChange = (event) => setHomeCounty(event.target.value);

  const [incidentNum, setIncidentNum] = useState(null);
  const handleIncidentNumChange = (event) => setIncidentNum(event.target.value);

  const [incomeBefore, setIncomeBefore] = useState("");
  const handleIncomeBeforeChange = (event) =>
    setIncomeBefore(event.target.value);

  const [accountsPrior, setAccountsPrior] = useState("");
  const handleAccountsPriorChange = (event) =>
    setAccountsPrior(event.target.value);

  const [lastUseDate, setLastUseDate] = useState("");
  const handleLastUseChange = (event) => setLastUseDate(event.target.value);

  const [yearsInside, setYearsInside] = useState(null);
  const handleYearsInsideChange = (event) => setYearsInside(event.target.value);

  const [sexOff, setSexOff] = useState("");
  const handleSexOffChange = (event) => setSexOff(event.target.value);

  const [recentStayLength, setRecentStayLength] = useState("");
  const handleRecentStayLength = (event) =>
    setRecentStayLength(event.target.value);

  const [drugChoice, setDrugChoice] = useState("");
  const handleDrugChoiceChange = (event) => setDrugChoice(event.target.value);

  const [startDate, setStartDate] = useState("");
  const handleStartDateChange = (event) => setStartDate(event.target.value);

  const [mat, setMat] = useState("");
  const handleMatChange = (event) => setMat(event.target.value);

  const [tanf, setTanf] = useState("");
  const handleTanfChange = (event) => setTanf(event.target.value);

  const [chargesDescr, setChargesDescr] = useState("");
  const handleChargesDescrChange = (event) =>
    setChargesDescr(event.target.value);

  const [copingLength, setCopingLength] = useState("");
  const handleCopingLengthChange = (event) =>
    setCopingLength(event.target.value);

  const [needsGed, setNeedsGed] = useState("");
  const handleNeedsGedChange = (event) => setNeedsGed(event.target.value);

  const [employmentDetails, setEmploymentDetails] = useState("");
  const handleEmploymentDetailsChange = (event) =>
    setEmploymentDetails(event.target.value);

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
      setGender(response.gender);
      setDob(response.birth_date);
      setHomeCounty(response.home_county);
      setIncidentNum(response.incident_num);
      setIncomeBefore(response.income_before_try);
      setAccountsPrior(response.accounts_before_try);
      setLastUseDate(response.last_use_date);
      setYearsInside(response.years_inside);
      setSexOff(response.sex_offender);
      setRecentStayLength(response.recent_stay_length);
      setDrugChoice(response.drug_of_choice);
      setStartDate(response.start_date);
      setMat(response.mat_entering_try);
      setTanf(response.tanf);
      setChargesDescr(response.charges);
      setCopingLength(response.coping_period_length);
      setNeedsGed(response.needs_ged);
      setEmploymentDetails(response.employment_status_entering);
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
      <h1>Enroll Participant</h1>
      <EnrollForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default EnrollParticipant;
