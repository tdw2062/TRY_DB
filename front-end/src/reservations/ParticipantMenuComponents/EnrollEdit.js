import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readParticipant,
  readInstance,
  createInstance,
  listInstances,
  updateInstance,
} from "../../utils/api";
import EnrollForm from "./EnrollForm";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function EnrollEdit({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => setGender(event.target.value);

  const [dob, setDob] = useState("");
  const handleDobChange = (event) => setDob(event.target.value);

  const [participantId, setParticipantId] = useState("");
  const handleParticipantIdChange = (event) =>
    setParticipantId(event.target.value);

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
  const handleRecentStayLengthChange = (event) =>
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

      let dobString = response.birth_date.substring(0, 10);
      let startDateString = response.start_date.substring(0, 10);
      let lastUseString = response.last_use_date.substring(0, 10);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setGender(response.gender);
      setDob(dobString);
      setParticipantId(response.participant_id);
      setHomeCounty(response.home_county);
      setIncidentNum(response.incident_num);
      setIncomeBefore(response.income_before_try);
      setAccountsPrior(response.accounts_before_try);
      setLastUseDate(lastUseString);
      setYearsInside(response.years_inside);
      setSexOff(response.sex_offender);
      setRecentStayLength(response.recent_stay_length);
      setDrugChoice(response.drug_of_choice);
      setStartDate(startDateString);
      setMat(response.mat_entering_try);
      setTanf(response.tanf);
      setChargesDescr(response.charges);
      setCopingLength(response.coping_period_length);
      setNeedsGed(response.needs_ged);
      setEmploymentDetails(response.employment_details);
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
    participant.data.first_name = firstName;
    participant.data.last_name = lastName;
    participant.data.gender = gender;
    participant.data.birth_date = dob;
    participant.data.home_county = homeCounty;
    participant.data.incident_num = incidentNum;
    participant.data.income_before_try = incomeBefore;
    participant.data.accounts_before_try = accountsPrior;
    participant.data.last_use_date = lastUseDate;
    participant.data.years_inside = yearsInside;
    participant.data.sex_offender = sexOff;
    participant.data.recent_stay_length = recentStayLength;
    participant.data.drug_of_choice = drugChoice;
    participant.data.start_date = startDate;
    participant.data.mat_entering_try = mat;
    participant.data.tanf = tanf;
    participant.data.charges = chargesDescr;
    participant.data.coping_period_length = copingLength;
    participant.data.needs_ged = needsGed;
    participant.data.employment_details = employmentDetails;
    participant.data.currently_in_program = "yes";

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
      <h1>Edit Enrollment Information</h1>
      <EnrollForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        gender={gender}
        handleGenderChange={handleGenderChange}
        dob={dob}
        handleDobChange={handleDobChange}
        instanceId={instanceId}
        homeCounty={homeCounty}
        handleHomeCountyChange={handleHomeCountyChange}
        incidentNum={incidentNum}
        handleIncidentNumChange={handleIncidentNumChange}
        incomeBefore={incomeBefore}
        handleIncomeBeforeChange={handleIncomeBeforeChange}
        accountsPrior={accountsPrior}
        handleAccountsPriorChange={handleAccountsPriorChange}
        lastUseDate={lastUseDate}
        handleLastUseChange={handleLastUseChange}
        yearsInside={yearsInside}
        handleYearsInsideChange={handleYearsInsideChange}
        sexOff={sexOff}
        handleSexOffChange={handleSexOffChange}
        recentStayLength={recentStayLength}
        handleRecentStayLengthChange={handleRecentStayLengthChange}
        drugChoice={drugChoice}
        handleDrugChoiceChange={handleDrugChoiceChange}
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        mat={mat}
        handleMatChange={handleMatChange}
        tanf={tanf}
        handleTanfChange={handleTanfChange}
        chargesDescr={chargesDescr}
        handleChargesDescrChange={handleChargesDescrChange}
        copingLength={copingLength}
        handleCopingLengthChange={handleCopingLengthChange}
        needsGed={needsGed}
        handleNeedsGedChange={handleNeedsGedChange}
        employmentDetails={employmentDetails}
        handleEmploymentDetailsChange={handleEmploymentDetailsChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default EnrollEdit;
