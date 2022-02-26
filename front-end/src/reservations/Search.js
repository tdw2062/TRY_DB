import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { listInstances } from "../utils/api";
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
  const [instances, setInstances] = useState([]);
  const [instancesError, setInstancesError] = useState(null);

  //UseEffect is used to get the reservations
  useEffect(loadDashboard, [last_name]);

  //Load all of the reservations filtered by phone number
  function loadDashboard() {
    const abortController = new AbortController();
    setInstancesError(null);
    console.log("last_name", last_name);

    listInstances({ last_name }, abortController.signal)
      .then((response) => {
        setInstances(response);
        console.log("instances", response);
      })
      .catch(setInstancesError);
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
      <h1>Find Instances</h1>
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
        <SearchResults
          visibility={visibilityStatus}
          last_name={last_name}
          instances={instances}
        />
      </div>
    </main>
  );
}

export default Search;
