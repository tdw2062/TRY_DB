//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listInstances } from "../utils/api";
import ErrorCaught from "../ErrorCaught";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ParticipantsDashboard({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  const [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Use useEffect to load the reservations and the tables

  //Load reservations
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setInstancesError(null);

    listInstances({}, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  //Create table rows of reservations using the 'reservations' state array
  const instanceLinks = instances.map((instance) => {
    let startDateString = instance.start_date.substring(0, 10);
    let dischargeDateString = instance.discharge_date.substring(0, 10);

    return (
      <tr key={instance.instance_id}>
        <td>{instance.participant_id}</td>
        <td>{instance.first_name}</td>
        <td>{instance.last_name}</td>
        <td>{instance.incident_num}</td>
        <td>{startDateString}</td>
        <td>{dischargeDateString}</td>
        <Link
          to={`/participants/${instance.participant_id}/statuses/${instance.incident_num}`}
        >
          <button type="button" class="btn btn-primary">
            Add Status
          </button>
        </Link>{" "}
        <Link to={`/participants/${instance.instance_id}/view`}>
          <button type="button" class="btn btn-primary">
            View
          </button>
        </Link>{" "}
        <button type="button" class="btn btn-primary">
          Edit
        </button>
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>Active Participants</h1>
      <table class="table">
        <tr>
          <th>Participant ID</th> <th>First Name</th> <th>Last Name</th>{" "}
          <th>Incident #</th>
          <th>Start Date</th> <th>Discharge Date</th>
        </tr>

        {instanceLinks}
      </table>
      <br />

      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default ParticipantsDashboard;
