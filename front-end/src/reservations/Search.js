import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { listInstances, listParticipants } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Search({ date }) {
  //Create the phone nubmer state variable and add event listeners
  const [last_name, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const [visibilityStatus, setVisibilityStatus] = useState(null);
  const [filteredParticipants, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);
  const [participantId, setParticipantId] = useState("");
  const handleParticipantIdChange = (event) =>
    setParticipantId(event.target.value);

  //UseEffect is used to get the reservations
  useEffect(loadDashboard, [last_name]);

  //Load all of the reservations filtered by phone number
  function loadDashboard() {
    const abortController = new AbortController();
    setInstancesError(null);
    console.log("last_name", last_name);

    listParticipants({ last_name }, abortController.signal)
      .then((response) => {
        setInstances(response);
        console.log("filteredParticipants", response);
      })
      .catch(setInstancesError);
    return () => abortController.abort();
  }

  //UseEffect is used to get the reservations
  useEffect(loadParticipants, []);

  //Load all of the participants filtered by last_name
  function loadParticipants() {
    const abortController = new AbortController();
    setParticipantsError(null);

    if (last_name) {
      listParticipants({ last_name }, abortController.signal)
        .then((response) => {
          setParticipants(response);
          console.log("participants", response);
        })
        .catch(setParticipantsError);
      return () => abortController.abort();
    } else {
      listParticipants({}, abortController.signal)
        .then((response) => {
          setParticipants(response);
          console.log("participants", response);
        })
        .catch(setParticipantsError);
      return () => abortController.abort();
    }
  }

  //Create the rows to fill the participants drop-down
  const participantLinks = participants.map((participant) => {
    return (
      <option value={participant.participant_id}>
        {participant.first_name} {participant.last_name}
      </option>
    );
  });

  //The handleSubmit function merely shows the search results
  const handleSubmit = (event) => {
    event.preventDefault();
    loadDashboard();
    setVisibilityStatus(true);
  };

  //Create the handleCancel function to cancel and return to the homepage1
  const handleCancel = (event) => {
    event.preventDefault();
  };

  //Return the form to enter the phone number and show the results
  return (
    <main>
      <h1>View/Edit Data</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="participants">Select Participant</label>
          <select
            className="form-control"
            id="participants"
            name="participants"
            value={participantId}
            onChange={handleParticipantIdChange}
          >
            <option value={""}>All Participants</option>
            {participantLinks}
          </select>
        </div>
        <button type="button" className="btn btn-primary">
          View/Edit Data
        </button>
        <br></br>

        <div className="form-group">
          <br></br>
          <h3>Look Up Participant</h3>
          <label htmlFor="last_name">Enter Participant's Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            id="last_name"
            onChange={handleLastNameChange}
            value={last_name}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Find
        </button>
      </form>
      <div>
        <SearchResults
          visibility={visibilityStatus}
          last_name={last_name}
          filteredParticipants={filteredParticipants}
        />
      </div>
    </main>
  );
}

export default Search;
