//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readParticipant, listStatuses, deleteStatus } from "../../utils/api";
import ParticipantMenu2 from "../ParticipantMenu2";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ViewAllStatuses({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  const [statuses, setStatuses] = useState([]);
  const [statusesError, setStatusesError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  useEffect(loadStatuses, [date]);

  function loadStatuses() {
    const abortController = new AbortController();
    setStatusesError(null);

    listStatuses({ participant_id }, abortController.signal)
      .then(setStatuses)
      .catch(setStatusesError);
    return () => abortController.abort();
  }

  //Load Participant
  //Make an API Call to get the instance on the instance_id
  useEffect(() => {
    async function getParticipant(participantId) {
      const response = await readParticipant(participantId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
    }
    getParticipant(participantId);
  }, [participantId]);

  async function handleDelete(status_id) {
    console.log("here is the status id", status_id);

    try {
      await deleteStatus(status_id);
    } catch (err) {
      console.log("Error making API call: ", err);
    }

    history.go(0);
  }

  //Create table rows of statuses using the 'statuses' state array
  const statusLinks = statuses.map((status) => {
    let dateString = status.date ? status.date.substring(0, 10) : null;

    return (
      <tr key={status.status_id}>
        <td style={{ padding: "10px" }}>{status.status_name}</td>
        <td style={{ padding: "10px" }}>{dateString}</td>
        <td style={{ padding: "10px" }}>{status.notes}</td>
        <Link to={`/statuses/${status.status_id}/edit`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            View/Edit Status
          </button>
        </Link>{" "}
        <button
          type="button"
          class="btn btn-primary"
          style={{ margin: "5px" }}
          onClick={() => {
            handleDelete(status.status_id);
          }}
        >
          Delete Status
        </button>
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>
        <center>View All Participant Statuses</center>
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
            <h1>Status Updates</h1>
            <table class="table table-sm">
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

export default ViewAllStatuses;
