import React, { useEffect, useState } from "react";
import { createStatus } from "../utils/api";

import { readInstance } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function AddStatus() {
  const [statuses, setStatuses] = useState([
    { statusId: 1, statusName: "Had RC" },
    { statusId: 2, statusName: "Start MAT" },
    { statusId: 3, statusName: "On Restrictions" },
    { statusId: 4, statusName: "Got License" },
    { statusId: 5, statusName: "Off Restrictions" },
    { statusId: 6, statusName: "ADM Funding Start" },
    { statusId: 7, statusName: "Drug Test Date" },
    { statusId: 8, statusName: "IOP Start Date" },
    { statusId: 9, statusName: "ADM Funding Start" },
  ]);

  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [incident, setIncident] = useState(null);
  const handleIncidentChange = (event) => setIncident(event.target.value);

  const [statusName, setStatusName] = useState(null);
  const handleStatusNameChange = (event) => setStatusName(event.target.value);

  const [statusDate, setStatusDate] = useState(null);
  const handleStatusDateChange = (event) => setStatusDate(event.target.value);

  const [statusNotes, setStatusNotes] = useState(null);
  const handleStatusNotesChange = (event) => setStatusNotes(event.target.value);

  //State vars for ErrorCaught
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Get ParticipantId from url
  const { instanceId } = useParams();

  //Make an API Call to get the reservation based on the reservation_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setIncident(response.incident_num);
    }
    getInstance(instanceId);
  }, [instanceId]);

  async function handleSubmit() {
    //Make an api call to post the new table to the db
    let status = {
      data: {},
    };

    status.data.instance_id = instanceId;
    status.data.status_name = statusName;
    status.data.date = statusDate;
    status.data.notes = statusNotes;

    try {
      const response = await createStatus(status);
    } catch (err) {
      console.log("Error making createTable API call: ", err);
    }

    alert("Status Update Added");
  }

  //Create table rows from the statuses state array and use to populate the drop-down
  const statusLinks = statuses.map((status) => (
    <option value={status.statusName}>{status.statusName}</option>
  ));

  //Return the html with status drop-down
  return (
    <main>
      <h1>Add Status Event</h1>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          id="first_name"
          aria-describedby="emailHelp"
          onChange={handleFirstNameChange}
          value={firstName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          onChange={handleLastNameChange}
          value={lastName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Incident</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          onChange={handleIncidentChange}
          value={incident}
        />
      </div>
      <div class="form-group">
        <form onSubmit={handleSubmit}>
          <label for="exampleFormControlSelect1">Select Status</label>
          <select
            class="form-control"
            id="statusName"
            name="statusName"
            onChange={handleStatusNameChange}
            value={statusName}
          >
            <option value="">--Select an Option--</option>
            {statusLinks}
          </select>
          <div className="form-group">
            <label htmlFor="status_date">Date of Status Update</label>
            <input
              type="date"
              name="status_date"
              className="form-control"
              id="status_date"
              onChange={handleStatusDateChange}
              value={statusDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status_notes">Status Notes</label>
            <input
              type="text"
              name="status_notes"
              className="form-control"
              id="status_notes"
              onChange={handleStatusNotesChange}
              value={statusNotes}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Status Update
          </button>
          <Link to={`/participants/${instanceId}/view`}>
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "5px" }}
            >
              Return to View Participant
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default AddStatus;
