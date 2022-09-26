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
            <input
              type="date"
              name="got_checking"
              className="form-control"
              id="got_checking"
              onChange={handleGotCheckingChange}
              value={gotChecking}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_license">Got Drivers License</label>
            <input
              type="date"
              name="got_license"
              className="form-control"
              id="got_license"
              onChange={handleGotLicenseChange}
              value={gotLicense}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_savings">Got Savings Account</label>
            <input
              type="date"
              name="got_savings"
              className="form-control"
              id="got_savings"
              onChange={handleGotSavingsChange}
              value={gotSavings}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="program_utilization">Program Utilization</label>
            <input
              type="text"
              name="program_utilization"
              className="form-control"
              id="program_utilization"
              onChange={handleProgramUtilizationChange}
              value={programUtilization}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="housing_transition">
              Transitioned to Stable Housing?
            </label>
            <input
              type="date"
              name="housing_transition"
              className="form-control"
              id="housing_transition"
              onChange={handleHousingTransitionChange}
              value={housingTransition}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="discharge_status">Status at Discharge</label>
            <input
              type="text"
              name="discharge_status"
              className="form-control"
              id="discharge_status"
              onChange={handleDischargeStatusChange}
              value={dischargeStatus}
            />
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
