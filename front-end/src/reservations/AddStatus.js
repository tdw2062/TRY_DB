import React, { useEffect, useState } from "react";
import { createStatus, readInstance, updateInstance } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function AddStatus() {
  const [statuses, setStatuses] = useState([
    { statusField: "off_coping_date", statusDescr: "Off Coping Date" },
    { statusField: "off_coping60_date", statusDescr: "Off Coping +60" },
    {
      statusField: "on_restrictions_date",
      statusDescr: "On Restrictions Date",
    },
    {
      statusField: "off_restrictions_date",
      statusDescr: "Off Restrictions Date",
    },
    {
      statusField: "employment_start_date",
      statusDescr: "Employment Start Date",
    },
    {
      statusField: "leadership_dev_start_date",
      statusDescr: "Leadership Development Start Date",
    },
    {
      statusField: "job_search_start_date",
      statusDescr: "Job Search Start Date",
    },
    { statusField: "iop_start_date", statusDescr: "IOP Start Date" },
    { statusField: "iop_end_date", statusDescr: "IOP End Date" },
    {
      statusField: "aftercare_start_date",
      statusDescr: "Aftercare Start Date",
    },
    { statusField: "aftercare_end_date", statusDescr: "Aftercare End Date" },
    { statusField: "ged_start_date", statusDescr: "GED Start Date" },
    { statusField: "ged_end_date", statusDescr: "GED End Date" },
    { statusField: "cpt_start_date", statusDescr: "CPT Start Date" },
    { statusField: "cpt_end_date", statusDescr: "CPT End Date" },
    {
      statusField: "rec_treatment_update",
      statusDescr: "Received Treatment Update",
    },
    { statusField: "had_counseling", statusDescr: "Had Individual Counseling" },
    { statusField: "relapse_date", statusDescr: "Relapse Date" },
    { statusField: "started_mat_date", statusDescr: "Started MAT" },
  ]);

  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    console.log(statusField);
  };

  const [incident, setIncident] = useState(null);
  const handleIncidentChange = (event) => setIncident(event.target.value);

  const [participantId, setParticipantId] = useState(null);

  const [statusName, setStatusName] = useState("Started MAT");
  const handleStatusNameChange = (event) => setStatusName(event.target.value);

  const [statusField, setStatusField] = useState(null);

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
      setParticipantId(response.participant_id);
    }
    getInstance(instanceId);
  }, [instanceId]);

  async function handleSubmit() {
    //Find the object that matches the statusName
    const objectMatch = statuses.find(
      ({ statusDescr }) => statusDescr === statusName
    );

    //Create an instance object to update the instances table
    let instance = {
      data: {},
    };

    instance.data.instance_id = instanceId;
    instance.data[objectMatch.statusField] = statusDate;

    console.log("Instance Number", instance.data.instance_id);
    console.log("Instance Field", instance.data);
    console.log("Instance Value", instance.data[objectMatch.statusField]);

    try {
      const response1 = await updateInstance(instance);
    } catch (err) {
      console.log("Error making createTable API call: ", err);
    }

    //Make an api call to post the new table to the db
    let status = {
      data: {},
    };

    status.data.instance_id = instanceId;
    status.data.participant_id = participantId;
    status.data.first_name = firstName;
    status.data.last_name = lastName;
    status.data.incident_num = incident;
    status.data.status_name = statusName;
    status.data.date = statusDate;
    status.data.notes = statusNotes;

    try {
      const response2 = await createStatus(status);
    } catch (err) {
      console.log("Error making createTable API call: ", err);
    }

    alert("Status Update Added");
  }

  //Create table rows from the statuses state array and use to populate the drop-down
  const statusLinks = statuses.map((status) => (
    <option value={status.statusDescr}>{status.statusDescr}</option>
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
