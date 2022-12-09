//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listInstances } from "../utils/api";
import ErrorCaught from "../ErrorCaught";
import { json2csv } from "json-2-csv";

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

    listInstances({ currently_in_program: "yes" }, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  function handleExportInstances() {
    json2csv(instances, (err, csv) => {
      if (err) throw err;
      console.log(typeof csv);
      console.log(csv.length);
      console.log(csv);
      const element = document.createElement("a");
      const file = new Blob([csv], {
        type: "application/csv",
      });
      element.href = URL.createObjectURL(file);
      element.download = "instancesExport.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  }

  //Create table rows of reservations using the 'reservations' state array
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
        <Link to={`/participants/${instance.instance_id}/view`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            View
          </button>
        </Link>{" "}
        <Link to={`/participants/${instance.instance_id}/edit`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Edit
          </button>
        </Link>
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

  //Return the html code for the reservations and the tables
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
      <button
        type="button"
        onClick={handleExportInstances}
        class="btn btn-primary"
        style={{ margin: "5px" }}
      >
        Download Instances CSV
      </button>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default ParticipantsDashboard;
