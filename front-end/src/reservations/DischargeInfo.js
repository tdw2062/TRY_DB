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
function DischargeInfo({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [startDate, setStartDate] = useState("");

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
      setStartDate(response.start_date);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Return the form to enter the reservation details
  return (
    <main>
      <h1>View Discharge Info</h1>
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
      </form>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default DischargeInfo;
