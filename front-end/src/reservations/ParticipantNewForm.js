//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ParticipantNewForm({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  dob,
  handleDobChange,
  current,
  handleCurrentChange,
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
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              id="dob"
              onChange={handleDobChange}
              value={dob}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="current">Currently in Program?</label>
            <input
              type="text"
              name="current"
              className="form-control"
              id="current"
              onChange={handleCurrentChange}
              value={current}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>{" "}
      <Link to={`/participants/dashboard`}>
        <button type="cancel" className="btn btn-primary">
          Return to Dashboard
        </button>
      </Link>
    </form>
  );
}

export default ParticipantNewForm;
