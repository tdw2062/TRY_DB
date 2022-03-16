import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readInstance, readParticipant, updateParticipant } from "../utils/api";
import ResForm from "./ResForm";

import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Documents({ date }) {
  //Create state variables for each field of employment info and add event listeners
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [birthCert, setBirthCert] = useState("");
  const [checking, setChecking] = useState("");
  const [id, setId] = useState("");
  const [license, setLicense] = useState("");
  const [savings, setSavings] = useState("");
  const [social, setSocial] = useState("");
  const [temps, setTemps] = useState("");

  //State vars for error message
  const [errMessage, setErrMessage] = useState("");
  const [visibility3, setVisibility3] = useState(null);

  //Get instanceId from url
  let { instanceId } = useParams();

  //Create instance of useHistory hook
  const history = useHistory();

  //Make an API Call to get the instance based on the instance_id
  useEffect(() => {
    async function getInstance(instanceId) {
      const response = await readInstance(instanceId);

      setFirstName(response.first_name);
      setLastName(response.last_name);
      setStartDate(response.start_date.substring(0, 10));
      setBirthCert(response.has_birth_certificate);
      setChecking(response.has_checking);
      setId(response.has_id);
      setLicense(response.has_license);
      setSavings(response.has_savings);
      setSocial(response.has_social);
      setTemps(response.has_temps);
    }
    getInstance(instanceId);
  }, [instanceId]);

  //Return the form to show the employment info
  return (
    <main>
      <h1>View Documents</h1>
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
          <label htmlFor="birth_cert">Has Birth Certificate?</label>
          <input
            type="text"
            name="birth_cert"
            className="form-control"
            id="birth_cert"
            readonly
            value={birthCert}
          />
        </div>
        <div className="form-group">
          <label htmlFor="checking">Has Checking?</label>
          <input
            type="text"
            name="checking"
            className="form-control"
            id="checking"
            readonly
            value={checking}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Has ID?</label>
          <input
            type="text"
            name="id"
            className="form-control"
            id="id"
            readonly
            value={id}
          />
        </div>
        <div className="form-group">
          <label htmlFor="license">Has License?</label>
          <input
            type="text"
            name="license"
            className="form-control"
            id="license"
            readonly
            value={license}
          />
        </div>

        <div className="form-group">
          <label htmlFor="savings">Has Savings?</label>
          <input
            type="text"
            name="savings"
            className="form-control"
            id="savings"
            readonly
            value={savings}
          />
        </div>
        <div className="form-group">
          <label htmlFor="social">Has Social?</label>
          <input
            type="text"
            name="social"
            className="form-control"
            id="social"
            readonly
            value={social}
          />
        </div>
        <div className="form-group">
          <label htmlFor="temps">Has Temps?</label>
          <input
            type="text"
            name="temps"
            className="form-control"
            id="temps"
            readonly
            value={temps}
          />
        </div>
      </form>
    </main>
  );
}

export default Documents;
