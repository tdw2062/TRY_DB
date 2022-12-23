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
  gotChecking,
  handleGotCheckingChange,
  gotLicense,
  handleGotLicenseChange,
  gotSavings,
  handleGotSavingsChange,

  programUtilization,
  handleProgramUtilizationChange,
  dischargeDate,
  handleDischargeDateChange,
  dischargeReason,
  handleDischargeReasonChange,
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
            <label htmlFor="got_checking">Got Checking?</label>
            <input
              type="text"
              name="got_checking"
              className="form-control"
              id="got_checking"
              onChange={handleGotCheckingChange}
              value={gotChecking}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_license">Got License?</label>
            <input
              type="text"
              name="got_license"
              className="form-control"
              id="got_license"
              onChange={handleGotLicenseChange}
              value={gotLicense}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="got_savings">Got Savings?</label>
            <input
              type="text"
              name="got_savings"
              className="form-control"
              id="got_savings"
              onChange={handleGotSavingsChange}
              value={gotSavings}
            />
          </div>
        </div>
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
      </div>
      <div class="row">
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
        <div class="col">
          <div className="form-group">
            <label htmlFor="discharge_reason">Discharge Reason</label>
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
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="housing_transition">Housing Transition</label>
            <input
              type="text"
              name="housing_transition"
              className="form-control"
              id="housing_transition"
              onChange={handleHousingTransitionChange}
              value={housingTransition}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="status_at_discharge">Status at Discharge</label>
            <input
              type="date"
              name="status_at_discharge"
              className="form-control"
              id="status_at_discharge"
              onChange={handleDischargeStatusChange}
              value={dischargeStatus}
            />
          </div>
        </div>
      </div>
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
