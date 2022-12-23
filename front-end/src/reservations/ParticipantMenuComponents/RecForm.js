//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StatusForm({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  instanceId,
  incidentNum,
  handleIncidentNumChange,
  startDate,
  handleStartDateChange,
  Yr1Fed,
  handleYr1FedChange,
  Yr1State,
  handleYr1StateChange,
  Yr1Note,
  handleYr1NoteChange,
  Yr2Fed,
  handleYr2FedChange,
  Yr2State,
  handleYr2StateChange,
  Yr2Note,
  handleYr2NoteChange,
  Yr3Fed,
  handleYr3FedChange,
  Yr3State,
  handleYr3StateChange,
  Yr3Note,
  handleYr3NoteChange,
  Yr4Fed,
  handleYr4FedChange,
  Yr4State,
  handleYr4StateChange,
  Yr4Note,
  handleYr4NoteChange,
  Yr5Fed,
  handleYr5FedChange,
  Yr5State,
  handleYr5StateChange,
  Yr5Note,
  handleYr5NoteChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div class="row">
        <div class="col">
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
              readOnly
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              id="last_name"
              onChange={handleLastNameChange}
              value={lastName}
              readOnly
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="incident_num">Incident Number</label>
            <input
              type="text"
              name="incident_num"
              className="form-control"
              id="incident_num"
              onChange={handleIncidentNumChange}
              value={incidentNum}
              readOnly
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              id="start_date"
              onChange={handleStartDateChange}
              value={startDate}
              readOnly
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="1_YR_Fed">1 Year Fed</label>
            <input
              type="text"
              name="1_YR_Fed"
              className="form-control"
              id="1_YR_Fed"
              onChange={handleYr1FedChange}
              value={Yr1Fed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="1_YR_State">1 Year State</label>
            <input
              type="text"
              name="1_YR_State"
              className="form-control"
              id="1_YR_State"
              onChange={handleYr1StateChange}
              value={Yr1State}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="1_YR_Note">1 Year Note</label>
            <input
              type="text"
              name="1_YR_Note"
              className="form-control"
              id="1_YR_Note"
              onChange={handleYr1NoteChange}
              value={Yr1Note}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="2_YR_Fed">2 Year Fed</label>
            <input
              type="text"
              name="2_YR_Fed"
              className="form-control"
              id="2_YR_Fed"
              onChange={handleYr2FedChange}
              value={Yr2Fed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="2_YR_State">2 Year State</label>
            <input
              type="text"
              name="2_YR_State"
              className="form-control"
              id="2_YR_State"
              onChange={handleYr2StateChange}
              value={Yr2State}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="2_YR_Note">2 Year Note</label>
            <input
              type="text"
              name="2_YR_Note"
              className="form-control"
              id="2_YR_Note"
              onChange={handleYr2NoteChange}
              value={Yr2Note}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="3_YR_Fed">3 Year Fed</label>
            <input
              type="text"
              name="3_YR_Fed"
              className="form-control"
              id="3_YR_Fed"
              onChange={handleYr3FedChange}
              value={Yr3Fed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="1_YR_State">3 Year State</label>
            <input
              type="text"
              name="3_YR_State"
              className="form-control"
              id="3_YR_State"
              onChange={handleYr3StateChange}
              value={Yr3State}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="3_YR_Note">3 Year Note</label>
            <input
              type="text"
              name="3_YR_Note"
              className="form-control"
              id="3_YR_Note"
              onChange={handleYr3NoteChange}
              value={Yr3Note}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="4_YR_Fed">4 Year Fed</label>
            <input
              type="text"
              name="4_YR_Fed"
              className="form-control"
              id="4_YR_Fed"
              onChange={handleYr4FedChange}
              value={Yr4Fed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="4_YR_State">4 Year State</label>
            <input
              type="text"
              name="4_YR_State"
              className="form-control"
              id="4_YR_State"
              onChange={handleYr4StateChange}
              value={Yr4State}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="4_YR_Note">4 Year Note</label>
            <input
              type="text"
              name="4_YR_Note"
              className="form-control"
              id="4_YR_Note"
              onChange={handleYr4NoteChange}
              value={Yr4Note}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="5_YR_Fed">5 Year Fed</label>
            <input
              type="text"
              name="5_YR_Fed"
              className="form-control"
              id="5_YR_Fed"
              onChange={handleYr5FedChange}
              value={Yr5Fed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="5_YR_State">5 Year State</label>
            <input
              type="text"
              name="5_YR_State"
              className="form-control"
              id="5_YR_State"
              onChange={handleYr5StateChange}
              value={Yr5State}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="5_YR_Note">5 Year Note</label>
            <input
              type="text"
              name="5_YR_Note"
              className="form-control"
              id="5_YR_Note"
              onChange={handleYr5NoteChange}
              value={Yr5Note}
            />
          </div>
        </div>
      </div>
      <div class="row"></div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>{" "}
      <Link to={`/instances/${instanceId}/view`}>
        <button type="button" className="btn btn-primary">
          Return to Previous
        </button>
      </Link>
    </form>
  );
}

export default StatusForm;
