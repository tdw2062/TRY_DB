import React, { useEffect, useState } from "react";
import { createStatus } from "../utils/api";
import ErrorCaught from "./ErrorCaught";
import { readParticipant } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

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

  //State vars for ErrorCaught
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Get ParticipantId from url
  const { participantId, incidentId } = useParams();

  //Make an API Call to get the reservation based on the reservation_id
  useEffect(() => {
    async function getParticipant(participantId) {
      const response = await readParticipant(participantId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setIncident(incidentId);
    }
    getParticipant(participantId);
  }, [participantId]);

  async function handleSubmit() {
    //Make an api call to post the new table to the db
    let status = {
      data: {},
    };

    status.data.participant_id = participantId;
    status.data.instance_id = incidentId;
    status.data.status_name = statusName;
    status.data.date = statusDate;

    try {
      const response = await createStatus(status);
    } catch (err) {
      console.log("Error making createTable API call: ", err);
    }
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
            <label htmlFor="status_date">Date of Reservation</label>
            <input
              type="date"
              name="status_date"
              className="form-control"
              id="status_date"
              onChange={handleStatusDateChange}
              value={statusDate}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default AddStatus;
