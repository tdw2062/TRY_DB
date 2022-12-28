import React, { useEffect, useState } from "react";
import { createStatus } from "../utils/api";

import { readInstance, updateInstance } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function RecCheck({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [incident, setIncident] = useState(null);
  const handleIncidentChange = (event) => setIncident(event.target.value);

  const [participantId, setParticipantId] = useState(null);
  const handleParicipantIdChange = (event) => setIncident(event.target.value);

  const [statusName, setStatusName] = useState(null);
  const handleStatusNameChange = (event) => setStatusName(event.target.value);

  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (event) => setStartDate(event.target.value);

  const [dischargeDate, setDischargeDate] = useState(null);
  const handleDischargeDateChange = (event) =>
    setDischargeDate(event.target.value);

  const [checkDate, setCheckDate] = useState(null);
  const handleCheckDateChange = (event) => setCheckDate(event.target.value);

  const [timePeriod, setTimePeriod] = useState(null);
  const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);

  const [fed, setFed] = useState("");
  const handleFedChange = (event) => setFed(event.target.value);

  const [state, setState] = useState("");
  const handleStateChange = (event) => setState(event.target.value);

  const [note, setNote] = useState("");
  const handleNoteChange = (event) => setNote(event.target.value);

  const [updatedProgramUtilization, setUpdatedProgramUtilization] =
    useState("");
  const handleUpdatedProgramUtilizationChange = (event) =>
    setUpdatedProgramUtilization(event.target.value);

  const [currentProgramUtilization, setCurrentProgramUtilization] =
    useState("");

  //State vars for ErrorCaught
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Get InstanceId from url
  const { instanceId } = useParams();
  console.log("instanceId", instanceId);

  const history = useHistory();

  //Make an API Call to get the reservation based on the reservation_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      let startDateString = response.start_date.substring(0, 10);
      let dischargeDateString = response.start_date.substring(0, 10);
      let checkDateString = response.start_date.substring(0, 10);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setIncident(response.incident_num);
      setParticipantId(response.participant_id);
      setStartDate(startDateString);
      setDischargeDate(dischargeDateString);
      setCheckDate(checkDateString);
      setCurrentProgramUtilization(response.program_utilization);
    }
    getInstance(instanceId);
    console.log(
      "start date",
      startDate,
      "discharge date",
      dischargeDate,
      "updatedProgramUtilization",
      updatedProgramUtilization
    );
  }, []);

  async function handleSubmit(event) {
    let instance = {
      data: {},
    };

    //To change date of current check into next_check_date
    function addOneYear(input) {
      const year = Number(input.substring(0, 4)) + 1;
      console.log("return value", year + input.substring(4));
      return year + input.substring(4);
    }
    console.log(typeof checkDate, "checkDate", checkDate);

    instance.data.instance_id = Number(instanceId);
    instance.data.next_check_date = addOneYear(checkDate);

    //Assign fields to instance object based on rec_form input and selections
    if (timePeriod === "1") instance.data["1_YR_Note"] = note;
    if (timePeriod === "1" && fed === "yes") instance.data["1_YR_Fed"] = "yes";
    if (timePeriod === "1" && fed === "no") instance.data["1_YR_Fed"] = "no";
    if (timePeriod === "1" && state === "yes")
      instance.data["1_YR_State"] = "yes";
    if (timePeriod === "1" && state === "no")
      instance.data["1_YR_State"] = "no";
    if (timePeriod === "2") instance.data["2_YR_Note"] = note;
    if (timePeriod === "2" && fed === "yes") instance.data["2_YR_Fed"] = "yes";
    if (timePeriod === "2" && fed === "no") instance.data["2_YR_Fed"] = "no";
    if (timePeriod === "2" && state === "yes")
      instance.data["2_YR_State"] = "yes";
    if (timePeriod === "2" && state === "no")
      instance.data["2_YR_State"] = "no";
    if (timePeriod === "3") instance.data["3_YR_Note"] = note;
    if (timePeriod === "3" && fed === "yes") instance.data["3_YR_Fed"] = "yes";
    if (timePeriod === "3" && fed === "no") instance.data["3_YR_Fed"] = "no";
    if (timePeriod === "3" && state === "yes")
      instance.data["3_YR_State"] = "yes";
    if (timePeriod === "3" && state === "no")
      instance.data["3_YR_State"] = "no";
    if (timePeriod === "4") instance.data["4_YR_Note"] = note;
    if (timePeriod === "4" && fed === "yes") instance.data["4_YR_Fed"] = "yes";
    if (timePeriod === "4" && fed === "no") instance.data["4_YR_Fed"] = "no";
    if (timePeriod === "4" && state === "yes")
      instance.data["4_YR_State"] = "yes";
    if (timePeriod === "4" && state === "no")
      instance.data["4_YR_State"] = "no";
    if (timePeriod === "5") instance.data["5_YR_Note"] = note;
    if (timePeriod === "5" && fed === "yes") instance.data["5_YR_Fed"] = "yes";
    if (timePeriod === "5" && fed === "no") instance.data["5_YR_Fed"] = "no";
    if (timePeriod === "5" && state === "yes")
      instance.data["5_YR_State"] = "yes";
    if (timePeriod === "5" && state === "no")
      instance.data["5_YR_State"] = "no";

    //Check to see if program utilization has been changed
    //If it has then put the updated value in instance.data
    //and run an api call to create a status
    if (
      updatedProgramUtilization !== "" &&
      currentProgramUtilization !== updatedProgramUtilization
    ) {
      instance.data["program_utilization"] = updatedProgramUtilization;

      //Make an api call to post the new table to the db

      let status = {
        data: {},
      };

      status.data.instance_id = instanceId;
      status.data.first_name = firstName;
      status.data.last_name = lastName;
      status.data.status_name = "Changed Program Utilization Success";
      status.data.date = checkDate;
      status.data.notes = note;
      status.data.participant_id = participantId;
      status.data.incident_num = incident;

      try {
        console.log("##status##", status);
        const response2 = await createStatus(status);
      } catch (err) {
        console.log("Error making createTable API call: ", err);
      }
    }

    //Make api call to update instance
    async function changeInstance(instance) {
      const response = await updateInstance(instance);
      if (response) alert("Recidivism Check Performed Successfully");
      console.log("returned response", response);
    }
    await changeInstance(instance);

    history.go(-1);
  }

  //Return the html with status drop-down
  return (
    <main>
      <h1>Recidivism Check</h1>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          id="first_name"
          aria-describedby="emailHelp"
          onChange={handleFirstNameChange}
          value={firstName}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          onChange={handleLastNameChange}
          value={lastName}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Incident</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          onChange={handleIncidentChange}
          value={incident}
          readOnly
        />
      </div>
      <div class="form-group">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              id="start_date"
              onChange={handleStartDateChange}
              value={startDate}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="discharge_date">Discharge Date</label>
            <input
              type="date"
              name="discharge_date"
              className="form-control"
              id="discharge_date"
              onChange={handleDischargeDateChange}
              value={dischargeDate}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="check_date">Date of Recidivism Check</label>
            <input
              type="date"
              name="check_date"
              className="form-control"
              id="check_date"
              onChange={handleCheckDateChange}
              value={checkDate}
            />
          </div>
          <label for="exampleFormControlSelect1">
            Select Time Period of Check
          </label>
          <select
            class="form-control"
            id="timePeriod"
            name="timePeriod"
            onChange={handleTimePeriodChange}
            value={timePeriod}
          >
            <option value="">--Time Period--</option>
            <option value="1"> 1 Year</option>
            <option value="2"> 2 Year</option>
            <option value="3"> 3 Year</option>
            <option value="4"> 4 Year</option>
            <option value="5"> 5 Year</option>
          </select>
          <label for="fed">Federal Check</label>
          <select
            class="form-control"
            id="fed"
            name="fed"
            onChange={handleFedChange}
            value={fed}
          >
            <option value="">--Went Back?--</option>
            <option value="yes"> Yes</option>
            <option value="no"> No</option>
          </select>
          <label for="state">State Check</label>
          <select
            class="form-control"
            id="state"
            name="state"
            onChange={handleStateChange}
            value={state}
          >
            <option value="">--Went Back?--</option>
            <option value="yes"> Yes</option>
            <option value="no"> No</option>
          </select>
          <label for="programUtilization">Program Utilization</label>
          <select
            class="form-control"
            id="programUtilization"
            name="programUtilization"
            onChange={handleUpdatedProgramUtilizationChange}
            value={updatedProgramUtilization}
          >
            <option value={currentProgramUtilization}>
              No Change in Program Utilization
            </option>
            <option value="Successful"> Changed to Successful</option>
            <option value="Unsuccessful">Changed to Unsuccessful</option>
          </select>
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <input
              type="text"
              name="note"
              className="form-control"
              id="note"
              onChange={handleNoteChange}
              value={note}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
          <Link to={`/participants/rec_dashboard`}>
            <button type="cancel" className="btn btn-primary">
              Return to Recidivism Dashboard
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default RecCheck;
