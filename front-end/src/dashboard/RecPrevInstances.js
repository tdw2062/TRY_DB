//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { listInstances } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function RecPrevInstances({ date }) {
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

  //Get instanceId from url
  const { participant_id } = useParams();
  console.log("participant id", participant_id);

  //Use useEffect to load the reservations and the tables
  //Load reservations
  useEffect(loadDashboard, [day, month, year]);
  function loadDashboard() {
    console.log("trying");
    const abortController = new AbortController();
    setInstancesError(null);

    listInstances({ participant_id }, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
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
      <tr key={instance.instance_id} style={{ padding: "15px" }}>
        <td>{instance.instance_id}</td>
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
        <td>
          <Link to={`/participants/${instance.instance_id}/rec_check`}>
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "5px" }}
            >
              Perform Check
            </button>
          </Link>{" "}
        </td>
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>View Previous Instances</h1>
      <br />
      <Link to={`/participants/rec_dashboard`}>
        <button type="button" class="btn btn-primary" style={{ margin: "5px" }}>
          Return to Recidivism Dashboard
        </button>{" "}
      </Link>
      <br />
      <br />
      <table class="table table-sm">
        <tr>
          <th>Instance ID</th> <th>First Name</th> <th>Last Name</th>
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
          <th></th>
        </tr>

        {instanceLinks}
      </table>
      <br />
    </main>
  );
}

export default RecPrevInstances;
