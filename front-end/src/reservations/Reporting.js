import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { listInstances, listParticipants, listStatuses } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { json2csv } from "json-2-csv";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reporting({ date }) {
  //Create the phone nubmer state variable and add event listeners
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);
  const [participantId, setParticipantId] = useState("");
  const handleParticipantIdChange = (event) =>
    setParticipantId(event.target.value);
  const [visibilityStatus, setVisibilityStatus] = useState(null);
  const [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);
  const [instance, setInstance] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [statusesError, setStatusesError] = useState(null);
  const [status, setStatus] = useState("");

  const handleInstanceChange = (event) => setInstance(event.target.value);

  //UseEffect is used to get the participants
  useEffect(loadParticipants, []);

  //Load all of the reservations filtered by phone number
  function loadParticipants() {
    const abortController = new AbortController();
    setParticipantsError(null);

    listParticipants({}, abortController.signal)
      .then((response) => {
        setParticipants(response);
        console.log("participants", response);
      })
      .catch(setParticipantsError);
    return () => abortController.abort();
  }

  //UseEffect is used to get the instances
  useEffect(loadInstances, [participantId]);

  //Load all of the instances filtered by participant_id
  function loadInstances() {
    const abortController = new AbortController();
    setInstancesError(null);
    const participant_id = participantId;
    console.log("participantId", participant_id);
    if (participant_id) {
      listInstances({ participant_id }, abortController.signal)
        .then((response) => {
          setInstances(response);
          console.log("instances", response);
        })
        .catch(setInstancesError);
      return () => abortController.abort();
    } else {
      listInstances({}, abortController.signal)
        .then((response) => {
          setInstances(response);
          console.log("instances", response);
        })
        .catch(setInstancesError);
      return () => abortController.abort();
    }
  }

  //UseEffect is used to get the statuses
  useEffect(loadStatuses, [participantId]);

  //Load all of the statuses filtered by participant_id
  function loadStatuses() {
    const abortController = new AbortController();
    setInstancesError(null);
    const participant_id = participantId;
    console.log("participantId", participant_id);
    if (participant_id) {
      listStatuses({ participant_id }, abortController.signal)
        .then((response) => {
          setStatuses(response);
          console.log("statuses", response);
        })
        .catch(setStatusesError);
      return () => abortController.abort();
    } else {
      listStatuses({}, abortController.signal)
        .then((response) => {
          setStatuses(response);
          console.log("statuses", response);
        })
        .catch(setStatusesError);
      return () => abortController.abort();
    }
  }

  function handleExportInstances() {
    json2csv(instances, (err, csv) => {
      if (err) throw err;
      //console.log(typeof csv);
      //console.log(csv.length);
      //console.log(csv);
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

  function handleExportStatuses() {
    json2csv(statuses, (err, csv) => {
      if (err) throw err;
      //console.log(typeof csv);
      //console.log(csv.length);
      //console.log(csv);
      const element = document.createElement("a");
      const file = new Blob([csv], {
        type: "application/csv",
      });
      element.href = URL.createObjectURL(file);
      element.download = "statusesExport.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  }

  //Create the handleCancel function to cancel and return to the homepage1
  const handleCancel = (event) => {
    event.preventDefault();
  };

  const participantLinks = participants.map((participant) => {
    return (
      <option value={participant.participant_id}>
        {participant.first_name} {participant.last_name}
      </option>
    );
  });

  async function handleSubmit(event) {}

  //Return the form to enter the phone number and show the results
  return (
    <main>
      <h1>Generate Reports</h1>
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

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleExportInstances}
        >
          Report Instances
        </button>
        <br></br>
        <br></br>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleExportStatuses}
        >
          Report Statuses
        </button>
      </form>
      <div></div>
    </main>
  );
}

export default Reporting;
