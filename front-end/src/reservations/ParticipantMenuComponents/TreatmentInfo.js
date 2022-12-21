import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readInstance,
  readParticipant,
  updateParticipant,
} from "../../utils/api";

import ErrorAlert from "../../layout/ErrorAlert";

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
  const [iopStart, setIopStart] = useState("");
  const [iopEnd, setIopEnd] = useState("");
  const [iopWeek, setIopWeek] = useState("");
  const [startMat, setStartMat] = useState("");
  const [afterCareStart, setAftercareStart] = useState("");
  const [afterCare8Week, setAftercare8Week] = useState("");
  const [afterCareEnd, setAftercareEnd] = useState("");

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
      if (response.start_date)
        setStartDate(response.start_date.substring(0, 10));
      if (response.iop_start_date)
        setIopStart(response.iop_start_date.substring(0, 10));
      if (response.iop_end_date)
        setIopEnd(response.iop_end_date.substring(0, 10));
      if (response.iop_week_date)
        setIopWeek(response.iop_week_date.substring(0, 10));
      if (response.started_mat_date)
        setStartMat(response.started_mat_date.substring(0, 10));
      if (response.aftercare_start_date)
        setAftercareStart(response.aftercare_start_date.substring(0, 10));
      if (response.aftercare_8week_date)
        setAftercare8Week(response.aftercare_8week_date.substring(0, 10));
      if (response.aftercare_end_date)
        setAftercareEnd(response.aftercare_end_date.substring(0, 10));
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
          <label htmlFor="iop_start">IOP Start Date</label>
          <input
            type="text"
            name="iop_start"
            className="form-control"
            id="iop_start"
            readonly
            value={iopStart}
          />
        </div>

        <div className="form-group">
          <label htmlFor="iop_end">IOP End Date</label>
          <input
            type="text"
            name="iop_end"
            className="form-control"
            id="iop_end"
            readonly
            value={iopEnd}
          />
        </div>
        <div className="form-group">
          <label htmlFor="iop_week">IOP Week Date</label>
          <input
            type="text"
            name="iop_week"
            className="form-control"
            id="iop_week"
            readonly
            value={iopWeek}
          />
        </div>

        <div className="form-group">
          <label htmlFor="started_mat">Started MAT Date</label>
          <input
            type="text"
            name="started_mat"
            className="form-control"
            id="started_mat"
            readonly
            value={startMat}
          />
        </div>
        <div className="form-group">
          <label htmlFor="aftercare_start">Started Aftercare</label>
          <input
            type="text"
            name="aftercare_start"
            className="form-control"
            id="aftercare_start"
            readonly
            value={afterCareStart}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aftercare_8week">Aftercare Eight Week</label>
          <input
            type="text"
            name="aftercare_8week"
            className="form-control"
            id="aftercare_8week"
            readonly
            value={afterCare8Week}
          />
        </div>
        <div className="form-group">
          <label htmlFor="aftercare_end">Aftercare End Date</label>
          <input
            type="text"
            name="aftercare_end"
            className="form-control"
            id="aftercare_end"
            readonly
            value={afterCareEnd}
          />
        </div>
      </form>
    </main>
  );
}

export default DischargeInfo;
