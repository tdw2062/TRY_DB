//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DischargeForm({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  startDate,
  handleStartDateChange,
  dischargeDate,
  handleDischargeDateChange,
  dischargeReason,
  handleDischargeReasonChange,
  gotChecking,
  handleGotCheckingChange,
  gotLicense,
  handleGotLicenseChange,
  gotSavings,
  handleGotSavingsChange,
  programUtilization,
  handleProgramUtilizationChange,
  housingTransition,
  handleHousingTransitionChange,
  dischargeStatus,
  handleDischargeStatusChange,
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
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              id="start_date"
              onChange={handleStartDateChange}
              value={startDate}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="discharge_date">Discharge Date</label>
            <input
              type="date"
              name="discharge_date"
              className="form-control"
              id="discharge_date"
              onChange={handleDischargeDateChange}
              value={dischargeDate}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="discharge_reason">Reason for Discharge</label>
            <input
              type="text"
              name="discharge_reason"
              className="form-control"
              id="discharge_reason"
              onChange={handleDischargeReasonChange}
              value={dischargeReason}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_checking">Got Checking Account</label>
            <select
              className="form-control"
              id="got_checking"
              name="got_checking"
              onChange={handleGotCheckingChange}
              value={gotChecking}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_license">Got Drivers License</label>
            <select
              className="form-control"
              id="got_license"
              name="got_license"
              onChange={handleGotLicenseChange}
              value={gotLicense}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_savings">Got Savings Account</label>
            <select
              className="form-control"
              id="got_savings"
              name="got_savings"
              onChange={handleGotSavingsChange}
              value={gotSavings}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="program_utilization">Program Utilization</label>
            <select
              className="form-control"
              id="program_utilization"
              name="program_utilization"
              onChange={handleProgramUtilizationChange}
              value={programUtilization}
            >
              <option value="successful">Successful</option>
              <option value="unsuccessful">Unsuccessful</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="housing_transition">
              Transitioned to Stable Housing?
            </label>
            <select
              className="form-control"
              id="housing_transition"
              name="housing_transition"
              onChange={handleHousingTransitionChange}
              value={housingTransition}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="discharge_status">Status at Discharge</label>
            <select
              className="form-control"
              id="discharge_status"
              name="discharge_status"
              onChange={handleDischargeStatusChange}
              value={dischargeStatus}
            >
              <option value="coping">Coping</option>
              <option value="coping +60">Coping +60</option>
              <option value="career development">Career Development</option>
              <option value="employed">Employed</option>
            </select>
          </div>
        </div>
        <div class="col"></div>
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

export default DischargeForm;
