import React, { useEffect, useState } from "react";
import { createStatus } from "../utils/api";
import ErrorCaught from "./ErrorCaught";
import { readInstance, updateInstance } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

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

  //State vars for ErrorCaught
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Get InstanceId from url
  const { instanceId } = useParams();
  console.log("instanceId", instanceId);

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
      setStartDate(startDateString);
      setDischargeDate(dischargeDateString);
      setCheckDate(checkDateString);
    }
    getInstance(instanceId);
    console.log("start date", startDate, "discharge date", dischargeDate);
  }, [instanceId]);

  async function handleSubmit(event) {
    let instance = {
      data: {},
    };

    instance.data.instance_id = Number(instanceId);
    if (timePeriod === "1") instance.data["1_YR"] = "yes";

    //Make api call to update instance
    async function changeInstance(instance) {
      const response = await updateInstance(instance);
      console.log(response);
    }
    await changeInstance(instance);
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
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default RecCheck;
