//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  readInstance,
  listStatuses,
  listInstances,
  readParticipant,
} from "../utils/api";
import ParticipantMenu2 from "./ParticipantMenu2";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ViewParticipant({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  const [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Get instanceId from url
  const { participantId } = useParams();
  const participant_id = participantId;
  console.log("participant id", participant_id);

  //Use useEffect to load the statuses and the instances
  //Load reservations
  useEffect(loadInstances, []);

  function loadInstances() {
    const abortController = new AbortController();
    setInstancesError(null);

    listInstances({ participant_id }, abortController.signal)
      .then(setInstances)
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  //Load instance
  //Make an API Call to get the instance on the instance_id
  useEffect(() => {
    async function getParticipant(participantId) {
      const response = await readParticipant(participantId);
      if (response.dob) setDateOfBirth(response.dob.substring(0, 10));
      setFirstName(response.first_name);
      setLastName(response.last_name);
    }
    getParticipant(participantId);
  }, [participantId]);

  //Create table rows of statuses using the 'statuses' state array
  const instanceLinks = instances.map((instance) => {
    console.log("instance", instance);
    let startDateString = instance.start_date
      ? instance.start_date.substring(0, 10)
      : "";
    let dischargeDateString = instance.discharge_date
      ? instance.discharge_date.substring(0, 10)
      : "";

    return (
      <tr key={instance.instance_id}>
        <td style={{ padding: "10px" }}>{startDateString}</td>
        <td style={{ padding: "10px" }}>{instance.incident_num}</td>
        <td style={{ padding: "10px" }}>{dischargeDateString}</td>
        <td style={{ padding: "10px" }}>{instance.discharge_reason}</td>
        <Link to={`/instances/${instance.instance_id}/view`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            View/Edit Instance
          </button>
        </Link>{" "}
        <Link to={`/participants/${instance.instance_id}/view`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Delete Instance
          </button>
        </Link>{" "}
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
        <table
          class="table table-sm"
          style={{ width: "70%", fontSize: "25px" }}
        >
          <tr style={{ padding: "5px" }}>
            <td>
              <strong>First Name: </strong>
              {firstName}{" "}
            </td>
            <td>
              <strong>Last Name: </strong> {lastName}
            </td>
            <td>
              <strong>Date of Birth: </strong> {dateOfBirth}
            </td>
          </tr>
        </table>
      </center>
      <br />

      <div class="container">
        <div class="row">
          <div class="col">
            <ParticipantMenu2 participantId={participantId} />
          </div>
          <div class="col-9">
            <h1>Instances</h1>
            <table class="table table-sm">
              <tr>
                <th>Start Date</th> <th>Incident Number</th>{" "}
                <th>Discharge Date</th>
                <th>Discharge Reason</th>{" "}
              </tr>
              {instanceLinks}
            </table>
          </div>
        </div>
      </div>

      <br />
    </main>
  );
}

export default ViewParticipant;
