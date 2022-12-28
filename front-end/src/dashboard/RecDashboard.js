//The main functions of the Recidivism Dashboard component are to display all of the participants that are
//active in the program. From there, you can perform a Recidivism check on a given participant.

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listInstances } from "../utils/api";

function RecDashboard({}) {
  //The main state variables are instances to be displayed in the dashboard
  let [instances, setInstances] = useState([]);
  let [instancesFiltered, setInstancesFiltered] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Use useEffect to load instances where participants are not currently in the program
  //Load instances
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

  //Create table rows of instances only for participants that are not currently_in_program
  const instanceLinks = instances
    .filter((instance) => instance.currently_in_program === "no")
    .map((instance) => {
      let programUtilization = instance.program_utilization;
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
          <td>{programUtilization}</td>
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
          <td>
            <Link to={`/participants/${instance.participant_id}/rec_prev`}>
              <button
                type="button"
                class="btn btn-primary"
                style={{ margin: "5px" }}
              >
                View All
              </button>
            </Link>{" "}
          </td>
        </tr>
      );
    });

  //Return the html code for the dashboard
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
      <table class="table table-sm">
        <tr>
          <th>Instance ID</th> <th>First Name</th> <th>Last Name</th>
          <th>Start Date</th> <th>Discharge Date</th>
          <th>Program Utilization</th>
          <th>Next Check Date</th>
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

export default RecDashboard;
