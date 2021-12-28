import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorCaught from "./ErrorCaught";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function AddStatus({ date }) {
  const [statuses, setStatuses] = useState([]);

  //State vars for ErrorCaught
  const [visibility3, setVisibility3] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  //Populate the statuses array, this will be replaced when I implement the api call
  let statusArray = [
    { statusId: 1, statusName: "Had RC" },
    { statusId: 2, statusName: "Start MAT" },
    { statusId: 3, statusName: "On Restrictions" },
  ];
  setStatuses(statusArray);

  //Create table rows from the statuses state array and use to populate the drop-down
  const statusLinks = statuses.map((status) => (
    <option value={status.statusId}>{status.statusName}</option>
  ));

  //Return the html with status drop-down
  return (
    <main>
      <h1>Add Status Event</h1>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Select Status</label>
        <select class="form-control" id="statusId" name="statusId">
          <option value="">--Select an Option--</option>
          {statusLinks}
        </select>
      </div>
      <ErrorCaught visibility3={visibility3} msg={errMessage} />
    </main>
  );
}

export default AddStatus;
