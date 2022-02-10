import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readInstance, readParticipant, updateParticipant } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function AdmFunding({ date }) {
  //Create state variables for each field of reservation and add event listeners
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [admStart, setAdmStart] = useState("");
  const [admFund, setAdmFund] = useState("");
  const [admDays, setAdmDays] = useState(null);
  const [admStatusTU, setAdmStatusTU] = useState("");
  const [adm90, setAdm90] = useState("");
  const [adm180, setAdm180] = useState("");
  const [lastAdmDate, setLastAdmDate] = useState("");

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
      setAdmStart(response.adm_start_date.substring(0, 10));
      setAdmFund(response.adm_fund);
      setAdmDays(response.adm_days);
      setAdmStatusTU(response.tu_status_adm);
      setAdm90(response.adm_90.substring(0, 10));
      setAdm180(response.adm_180.substring(0, 10));
      setLastAdmDate(response.last_adm_date.substring(0, 10));
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Return the form to enter the reservation details
  return (
    <main>
      <h1>View Treatment Info</h1>
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
          <label htmlFor="adm_start">ADM Start Date:</label>
          <input
            type="text"
            name="adm_start"
            className="form-control"
            id="adm_start"
            readonly
            value={admStart}
          />
        </div>

        <div className="form-group">
          <label htmlFor="adm_fund">ADM Funding:</label>
          <input
            type="text"
            name="adm_fund"
            className="form-control"
            id="adm_fund"
            readonly
            value={admFund}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adm_days">ADM Days:</label>
          <input
            type="text"
            name="adm_days"
            className="form-control"
            id="adm_days"
            readonly
            value={admDays}
          />
        </div>

        <div className="form-group">
          <label htmlFor="adm_status">ADM Treatment Update Status:</label>
          <input
            type="text"
            name="adm_status"
            className="form-control"
            id="adm_status"
            readonly
            value={admStatusTU}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adm_90">ADM 90 Days:</label>
          <input
            type="text"
            name="adm_90"
            className="form-control"
            id="adm_90"
            readonly
            value={adm90}
          />
        </div>

        <div className="form-group">
          <label htmlFor="adm_180">ADM 180:</label>
          <input
            type="text"
            name="adm_180"
            className="form-control"
            id="adm_180"
            readonly
            value={adm180}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_adm_date">Last ADM Date:</label>
          <input
            type="text"
            name="last_adm_date"
            className="form-control"
            id="last_adm_date"
            readonly
            value={lastAdmDate}
          />
        </div>
      </form>
    </main>
  );
}

export default AdmFunding;
