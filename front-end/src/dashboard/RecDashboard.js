//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listInstances } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function RecDashboard({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  let [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Use useEffect to load the reservations and the tables

  //Load reservations
  useEffect(loadDashboard, [day, month, year]);

  function loadDashboard() {
    console.log("trying");

    const abortController = new AbortController();
    setInstancesError(null);

    listInstances({ day, month, year }, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  function pastDue() {
    const currDate = new Date();
    setMonth(currDate.getMonth());
    setDay(currDate.getDate());
    setYear(currDate.getFullYear());
    console.log("dateString", month, day, year);
  }

  function dueWithin30() {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 30);
    setMonth(currDate.getMonth());
    setDay(currDate.getDate());
    setYear(currDate.getFullYear());
    console.log("dateString", month, day, year);
  }

  function dueWithin90() {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 90);
    setMonth(currDate.getMonth());
    setDay(currDate.getDate());
    setYear(currDate.getFullYear());
    console.log("dateString", month, day, year);
  }

  //Create table rows of reservations using the 'reservations' state array
  const instanceLinks = instances.map((instance) => {
    let startDateString = instance.start_date.substring(0, 10);
    let dischargeDateString = "";
    if (instance.discharge_date)
      dischargeDateString = instance.discharge_date.substring(0, 10);
    let checkDateString = null;
    if (instance.next_check_date)
      checkDateString = instance.next_check_date.substring(0, 10);

    return (
      <tr key={instance.instance_id}>
        <td>{instance.participant_id}</td>
        <td>{instance.first_name}</td>
        <td>{instance.last_name}</td>
        <td>{startDateString}</td>
        <td>{dischargeDateString}</td>
        <td>{checkDateString}</td>
        <td>{instance["1_YR_Fed"]}</td>
        <td>{instance["1_YR_State"]}</td>
        <td>{instance["2_YR_Fed"]}</td>
        <td>{instance["2_YR_State"]}</td>
        <td>{instance["3_YR_Fed"]}</td>
        <td>{instance["3_YR_State"]}</td>
        <td>{instance["4_YR_Fed"]}</td>
        <td>{instance["4_YR_State"]}</td>
        <td>{instance["5_YR_Fed"]}</td>
        <td>{instance["5_YR_State"]}</td>
        <Link to={`/participants/${instance.instance_id}/rec_check`}>
          <button type="button" class="btn btn-primary">
            Perform Check
          </button>
        </Link>{" "}
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>Recidivism Dashboard</h1>
      <br />
      <button type="button" class="btn btn-primary" onClick={pastDue}>
        Past Due
      </button>{" "}
      <button type="button" class="btn btn-primary" onClick={dueWithin30}>
        Due within 30 Days
      </button>{" "}
      <button type="button" class="btn btn-primary" onClick={dueWithin90}>
        Due within 90 Days
      </button>
      <br />
      <br />
      <table>
        <tr>
          <th>Participant ID</th> <th>First Name</th> <th>Last Name</th>{" "}
          <th>Start Date</th> <th>Discharge Date</th> <th>Next Check Date</th>
          <th>1 YR Fed</th>
          <th>1 YR State</th>
          <th>2 YR Fed</th>
          <th>2 YR State</th>
          <th>3 YR Fed</th>
          <th>3 YR State</th>
          <th>4 YR Fed</th>
          <th>4 YR State</th>
          <th>5 YR Fed</th>
          <th>5 YR State</th>
        </tr>

        {instanceLinks}
      </table>
      <br />
    </main>
  );
}

export default RecDashboard;
