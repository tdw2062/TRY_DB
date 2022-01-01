//The main functions of the Dashboard component are to display all of the reservations
//and allow the user to seat, edit, or cancel reservations and to display all of the
//tables and allow the user to finish the tables

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listParticipants } from "../utils/api";
import ErrorCaught from "../reservations/ErrorCaught";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ParticipantsDashboard({ date }) {
  //The main state variables are reservations and tables which are arrays to be displayed
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  //Declare an instance of the useHistory hook
  const history = useHistory();

  //Use useEffect to load the reservations and the tables

  //Load reservations
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setParticipantsError(null);

    listParticipants({}, abortController.signal)
      .then(setParticipants)
      .catch(setParticipantsError);
    return () => abortController.abort();
  }

  //Create table rows of reservations using the 'reservations' state array
  const participantLinks = participants.map((participant) => {
    return (
      <tr key={participant.participant_id}>
        <td>{participant.participant_id}</td>
        <td>{participant.first_name}</td>
        <td>{participant.last_name}</td>
        <td>{participant.mobile_number}</td>
      </tr>
    );
  });

  //Return the html code for the reservations and the tables
  return (
    <main>
      <h1>Participants</h1>
      <table>
        <tr>
          <th>Participant ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Mobile Number</th>
        </tr>

        {participantLinks}
      </table>
      <br />

      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default ParticipantsDashboard;
