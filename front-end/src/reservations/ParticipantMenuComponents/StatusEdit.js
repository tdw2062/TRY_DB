import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readParticipant,
  readInstance,
  createInstance,
  listInstances,
  updateInstance,
} from "../../utils/api";
import StatusForm from "./StatusForm";

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

  const [offCoping, setOffCoping] = useState(null);
  const handleOffCopingChange = (event) => setOffCoping(event.target.value);

  const [offCoping60, setOffCoping60] = useState(null);
  const handleOffCoping60Change = (event) => setOffCoping60(event.target.value);

  const [employmentStart, setEmploymentStart] = useState(null);
  const handleEmploymentStartChange = (event) =>
    setEmploymentStart(event.target.value);

  const [leadershipDev, setLeadershipDev] = useState(null);
  const handleLeadershipDevChange = (event) =>
    setLeadershipDev(event.target.value);

  const [jobSearch, setJobSearch] = useState(null);
  const handleJobSearchChange = (event) => setJobSearch(event.target.value);

  const [iopStart, setIopStart] = useState(null);
  const handleIopStartChange = (event) => setIopStart(event.target.value);

  const [iopEnd, setIopEnd] = useState(null);
  const handleIopEndChange = (event) => setIopEnd(event.target.value);

  const [aftercareStart, setAftercareStart] = useState(null);
  const handleAftercareStartChange = (event) =>
    setAftercareStart(event.target.value);

  const [aftercareEnd, setAftercareEnd] = useState(null);
  const handleAftercareEndChange = (event) =>
    setAftercareEnd(event.target.value);

  const [gedStart, setGedStart] = useState(null);
  const handleGedStartChange = (event) => setGedStart(event.target.value);

  const [gedEnd, setGedEnd] = useState(null);
  const handleGedEndChange = (event) => setGedEnd(event.target.value);

  const [cptStart, setCptStart] = useState(null);
  const handleCptStartChange = (event) => setCptStart(event.target.value);

  const [cptEnd, setCptEnd] = useState(null);
  const handleCptEndChange = (event) => setCptEnd(event.target.value);

  const [matStart, setMatStart] = useState(null);
  const handleMatStartChange = (event) => setMatStart(event.target.value);

  const [onRestrictions, setOnRestrictions] = useState(null);
  const handleOnRestrictionsChange = (event) =>
    setOnRestrictions(event.target.value);

  const [offRestrictions, setOffRestrictions] = useState(null);
  const handleOffRestrictionsChange = (event) =>
    setOffRestrictions(event.target.value);

  const [drugTest, setDrugTest] = useState(null);
  const handleDrugTestChange = (event) => setDrugTest(event.target.value);

  const [recTreatmentUpdate, setRecTreatmentUpdate] = useState(null);
  const handleRecTreatmentUpdateChange = (event) =>
    setRecTreatmentUpdate(event.target.value);

  const [hadCounseling, setHadCounseling] = useState(null);
  const handleHadCounselingChange = (event) =>
    setHadCounseling(event.target.value);

  const [relapseDate, setRelapseDate] = useState(null);
  const handleRelapseDateChange = (event) => setRelapseDate(event.target.value);

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
      if (response.off_coping_date)
        setOffCoping(response.off_coping_date.substring(0, 10));
      if (response.off_coping60_date)
        setOffCoping60(response.off_coping60_date.substring(0, 10));
      if (response.employment_start_date)
        setEmploymentStart(response.employment_start_date.substring(0, 10));
      if (response.leadership_dev_start_date)
        setLeadershipDev(response.leadership_dev_start_date.substring(0, 10));
      if (response.job_search_start_date)
        setJobSearch(response.job_search_start_date.substring(0, 10));
      if (response.iop_start_date)
        setIopStart(response.iop_start_date.substring(0, 10));
      if (response.iop_end_date)
        setIopEnd(response.iop_end_date.substring(0, 10));
      if (response.aftercare_start_date)
        setAftercareStart(response.aftercare_start_date.substring(0, 10));
      if (response.aftercare_end_date)
        setAftercareEnd(response.aftercare_end_date.substring(0, 10));
      if (response.ged_start_date)
        setGedStart(response.ged_start_date.substring(0, 10));
      if (response.ged_end_date)
        setGedEnd(response.ged_end_date.substring(0, 10));
      if (response.cpt_start_date)
        setCptStart(response.cpt_start_date.substring(0, 10));
      if (response.cpt_end_date)
        setCptEnd(response.cpt_end_date.substring(0, 10));
      if (response.started_mat_date)
        setMatStart(response.started_mat_date.substring(0, 10));
      if (response.on_restrictions)
        setOnRestrictions(response.on_restrictions.substring(0, 10));
      if (response.off_restrictions)
        setOffRestrictions(response.off_restrictions.substring(0, 10));
      if (response.drug_test_date)
        setDrugTest(response.drug_test_date.substring(0, 10));
      if (response.rec_treatment_update)
        setRecTreatmentUpdate(response.rec_treatment_update.substring(0, 10));
      if (response.had_counseling)
        setHadCounseling(response.had_counseling.substring(0, 10));
      if (response.relapse_date)
        setRelapseDate(response.relapse_date.substring(0, 10));
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
    participant.data.off_coping_date = offCoping;
    participant.data.off_coping60_date = offCoping60;
    participant.data.employment_start_date = employmentStart;
    participant.data.leadership_dev_start_date = leadershipDev;
    participant.data.job_search_start_date = jobSearch;
    participant.data.iop_start_date = iopStart;
    participant.data.iop_end_date = iopEnd;
    participant.data.aftercare_start_date = aftercareStart;
    participant.data.aftercare_end_date = aftercareEnd;
    participant.data.ged_start_date = gedStart;
    participant.data.ged_end_date = gedEnd;
    participant.data.cpt_start_date = cptStart;
    participant.data.cpt_end_date = cptEnd;
    participant.data.started_mat_date = matStart;
    participant.data.on_restrictions_date = onRestrictions;
    participant.data.off_restrictions_date = offRestrictions;
    participant.data.drug_test_date = drugTest;
    participant.data.rec_treatment_update = recTreatmentUpdate;
    participant.data.had_counseling = hadCounseling;
    participant.data.relapse_date = relapseDate;

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
      <StatusForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        instanceId={instanceId}
        incidentNum={incidentNum}
        handleIncidentNumChange={handleIncidentNumChange}
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        offCoping={offCoping}
        handleOffCopingChange={handleOffCopingChange}
        offCoping60={offCoping60}
        handleOffCoping60Change={handleOffCoping60Change}
        employmentStart={employmentStart}
        handleEmploymentStartChange={handleEmploymentStartChange}
        leadershipDev={leadershipDev}
        handleLeadershipDevChange={handleLeadershipDevChange}
        jobSearch={jobSearch}
        handleJobSearchChange={handleJobSearchChange}
        iopStart={iopStart}
        handleIopStartChange={handleIopStartChange}
        iopEnd={iopEnd}
        handleIopEndChange={handleIopEndChange}
        aftercareStart={aftercareStart}
        handleAftercareStartChange={handleAftercareStartChange}
        aftercareEnd={aftercareEnd}
        handleAftercareEndChange={handleAftercareEndChange}
        gedStart={gedStart}
        handleGedStartChange={handleGedStartChange}
        gedEnd={gedEnd}
        handleGedEndChange={handleGedEndChange}
        cptStart={cptStart}
        handleCptStartChange={handleCptStartChange}
        cptEnd={cptEnd}
        handleCptEndChange={handleCptEndChange}
        matStart={matStart}
        handleMatStartChange={handleMatStartChange}
        onRestrictions={onRestrictions}
        handleOnRestrictionsChange={handleOnRestrictionsChange}
        offRestrictions={offRestrictions}
        handleOffRestrictionsChange={handleOffRestrictionsChange}
        drugTest={drugTest}
        handleDrugTestChange={handleDrugTestChange}
        recTreatementUpdate={recTreatmentUpdate}
        handleRecTreatmentUpdateChange={handleRecTreatmentUpdateChange}
        hadCounseling={hadCounseling}
        handleHadCounselingChange={handleHadCounselingChange}
        relapseDate={relapseDate}
        handleRelapseDateChange={handleRelapseDateChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </main>
  );
}

export default StatusEdit;
