//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readInstance, listStatuses } from "../utils/api";
import ParticipantMenu from "./ParticipantMenu";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ParticipantsDashboard({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  const [statuses, setStatuses] = useState([]);
  const [statusesError, setStatusesError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [incidentNum, setIncidentNum] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Get instanceId from url
  const { instanceId } = useParams();

  //Use useEffect to load the statuses and the instances
  //Load reservations
  useEffect(loadStatuses, [date]);

  function loadStatuses() {
    const abortController = new AbortController();
    setStatusesError(null);

    listStatuses({}, abortController.signal)
      .then(setStatuses)
      .catch(setStatusesError);
    return () => abortController.abort();
  }

  //Load instance
  //Make an API Call to get the instance on the instance_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      let instDateString = response.start_date.substring(0, 10);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setIncidentNum(response.incident_num);
      setStartDate(instDateString);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Create table rows of statuses using the 'statuses' state array
  const statusLinks = statuses.map((status) => {
    let dateString = status.date.substring(0, 10);

    return (
      <tr key={status.status_id}>
        <td>{status.status_name}</td>
        <td>{dateString}</td>
        <td>{status.notes}</td>
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>
        <center>View Participant</center>
      </h1>
      <center>
        <table>
          <tr>
            <td>First Name: {firstName} </td>
            <td>Last Name: {lastName}</td>
            <td>Incident #: {incidentNum}</td>
            <td>Start Date: {startDate}</td>
          </tr>
        </table>
      </center>
      <br />

      <div class="container">
        <div class="row">
          <div class="col">
            <ParticipantMenu />
          </div>
          <div class="col-9">
            <h1>Status Updates</h1>
            <table>
              <tr>
                <th>Status Name</th> <th>Date</th> <th>Notes</th>{" "}
              </tr>
              {statusLinks}
            </table>
          </div>
        </div>
      </div>

      <br />
    </main>
  );
}

export default ParticipantsDashboard;
