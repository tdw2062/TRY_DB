//The main functions of the Dashboard component are to display all of the active participants
//and allow the user to add a status, view, or discharge the participant

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
  //The main state variabe is instances which is an instance of an active particpant to be displayed
  const [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Use useEffect to load the participants that are currently_in_program
  //Load isntances
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setInstancesError(null);

    listInstances({ currently_in_program: "yes" }, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  //Create table rows of instances using the 'instances' state array
  const instanceLinks = instances.map((instance) => {
    let startDateString = instance.start_date.substring(0, 10);
    let dischargeDateString = "";
    if (instance.discharge_date)
      dischargeDateString = instance.discharge_date.substring(0, 10);

    return (
      <tr key={instance.instance_id}>
        <td>{instance.instance_id}</td>
        <td>{instance.first_name}</td>
        <td>{instance.last_name}</td>
        <td>{instance.incident_num}</td>
        <td>{startDateString}</td>
        <td>{dischargeDateString}</td>
        <Link to={`/participants/${instance.instance_id}/statuses`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Add Status
          </button>
        </Link>{" "}
        <Link to={`/instances/${instance.instance_id}/view`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            View/Edit
          </button>
        </Link>{" "}
        <Link
          to={`/participants/${instance.instance_id}/discharge_participant`}
        >
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Discharge
          </button>
        </Link>{" "}
      </tr>
    );
  });

  //Return the html code for the display of instances
  return (
    <main>
      <h1>Active Participants</h1>
      <table class="table">
        <tr>
          <th>Instance ID</th> <th>First Name</th> <th>Last Name</th>{" "}
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
