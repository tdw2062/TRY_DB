import React, { useEffect, useState } from "react";
import EnrollSearch from "./EnrollSearch";
import { Link } from "react-router-dom";
import { listParticipants } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function EnrollHome({ date }) {
  //Create the phone nubmer state variable and add event listeners
  const [last_name, setLastName] = useState("");
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const [visibilityStatus, setVisibilityStatus] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);

  //UseEffect is used to get the reservations
  useEffect(loadDashboard, [last_name]);

  //Load all of the reservations filtered by phone number
  function loadDashboard() {
    const abortController = new AbortController();
    setParticipantsError(null);
    console.log("last_name", last_name);

    listParticipants({ last_name }, abortController.signal)
      .then((response) => {
        setParticipants(response);
        console.log("participants", response);
      })
      .catch(setParticipantsError);
    return () => abortController.abort();
  }

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
      <h1>Enroll Participants</h1>
      <br />
      <h3>Enter New Participant</h3>
      <Link to={`/participants/createParticipant`}>
        <button type="submit" className="btn btn-primary">
          Create New Participant
        </button>
      </Link>
      <br></br>
      <br />
      <h3>Lookup Participants</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="last_name">Enter a Participant's Last Name</label>
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
        <EnrollSearch
          visibility={visibilityStatus}
          last_name={last_name}
          participants={participants}
        />
      </div>
    </main>
  );
}

export default EnrollHome;
