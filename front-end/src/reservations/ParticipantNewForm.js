//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function ParticipantNewForm({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  dob,
  handleDobChange,
  handleSubmit,
  handleCancel,
}) {
  const history = useHistory();

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
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>{" "}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          history.goBack();
        }}
      >
        Return to Previous
      </button>
    </form>
  );
}

export default ParticipantNewForm;
