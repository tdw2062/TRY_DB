import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readInstance, readParticipant, updateParticipant } from "../utils/api";
import ResForm from "./ResForm";
import ErrorCaught from "./ErrorCaught";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function EmploymentInfo({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [gedStart, setGedStart] = useState("");
  const [gedEnd, setGedEnd] = useState("");
  const [jobSearchStart, setJobSearchStart] = useState("");
  const [leaderDevStart, setLeaderDevStart] = useState("");
  const [lastLD, setLastLD] = useState("");
  const [employDetails, setEmployDetails] = useState("");

  //State vars for error message
  const [errMessage, setErrMessage] = useState("");
  const [visibility3, setVisibility3] = useState(null);

  //Get ParticipantId from url
  let { instanceId } = useParams();

  //Create instance of useHistory hook
  const history = useHistory();

  //Make an API Call to get the reservation based on the reservation_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setStartDate(response.start_date.substring(0, 10));
      setGedStart(response.ged_start_date.substring(0, 10));
      setGedEnd(response.ged_end_date.substring(0, 10));
      setJobSearchStart(response.job_search_start.substring(0, 10));
      setLeaderDevStart(response.leadership_dev_start.substring(0, 10));
      setLastLD(response.last_ld_meeting.substring(0, 10));
      setEmployDetails(response.employment_details);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Return the form to show the employment info
  return (
    <main>
      <h1>View Employment Info</h1>
      <form>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            id="first_name"
            aria-describedby="emailHelp"
            readonly
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
            readonly
            value={lastName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="text"
            name="start_date"
            className="form-control"
            id="start_date"
            readonly
            value={startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ged_start">GED Start Date:</label>
          <input
            type="text"
            name="ged_start"
            className="form-control"
            id="ged_start"
            readonly
            value={gedStart}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ged_end">GED End Date:</label>
          <input
            type="text"
            name="ged_end"
            className="form-control"
            id="ged_end"
            readonly
            value={gedEnd}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job_search_start">Job Search Start Date:</label>
          <input
            type="text"
            name="job_search_start"
            className="form-control"
            id="job_search_start"
            readonly
            value={jobSearchStart}
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadership_dev_start">
            Leadership Development Start Date:
          </label>
          <input
            type="text"
            name="leadership_dev_start"
            className="form-control"
            id="leadership_dev_start"
            readonly
            value={leaderDevStart}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_ld_meeting">
            Last Leadership Development Meeting:
          </label>
          <input
            type="text"
            name="last_ld_meeting"
            className="form-control"
            id="last_ld_meeting"
            readonly
            value={lastLD}
          />
        </div>
        <div className="form-group">
          <label htmlFor="employment_details">Employment Details:</label>
          <input
            type="text"
            name="employment_details"
            className="form-control"
            id="employment_details"
            readonly
            value={employDetails}
          />
        </div>
      </form>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default EmploymentInfo;
