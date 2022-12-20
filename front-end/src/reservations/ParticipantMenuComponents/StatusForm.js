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
  incidentNum,
  handleIncidentNumChange,
  startDate,
  handleStartDateChange,
  offCoping,
  handleOffCopingChange,
  offCoping60,
  handleOffCoping60Change,
  employmentStart,
  handleEmploymentStartChange,

  leadershipDev,
  handleLeadershipDevChange,
  jobSearch,
  handleJobSearchChange,
  iopStart,
  handleIopStartChange,
  iopEnd,
  handleIopEndChange,
  aftercareStart,
  handleAftercareStartChange,
  aftercareEnd,
  handleAftercareEndChange,
  gedStart,
  handleGedStartChange,
  gedEnd,
  handleGedEndChange,
  cptStart,
  handleCptStartChange,
  cptEnd,
  handleCptEndChange,
  matStart,
  handleMatStartChange,
  onRestrictions,
  handleOnRestrictionsChange,
  offRestrictions,
  handleOffRestrictionsChange,
  drugTest,
  handleDrugTestChange,
  recTreatmentUpdate,
  handleRecTreatmentUpdateChange,
  hadCounseling,
  handleHadCounselingChange,
  relapseDate,
  handleRelapseDateChange,
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
            <label htmlFor="incident_num">Incident Number</label>
            <input
              type="text"
              name="incident_num"
              className="form-control"
              id="incident_num"
              onChange={handleIncidentNumChange}
              value={incidentNum}
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
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="off_coping_date">Off Coping Date</label>
            <input
              type="date"
              name="off_coping_date"
              className="form-control"
              id="off_coping_date"
              onChange={handleOffCopingChange}
              value={offCoping}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="off_coping60_date">Off Coping 60 Date</label>
            <input
              type="date"
              name="off_coping60_date"
              className="form-control"
              id="off_coping60_date"
              onChange={handleOffCoping60Change}
              value={offCoping60}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="employment_start_date">Employment Start Date</label>
            <input
              type="date"
              name="employment_start_date"
              className="form-control"
              id="employment_start_date"
              onChange={handleEmploymentStartChange}
              value={employmentStart}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="leadership_dev_start_date">
              Leadership Development Start Date
            </label>
            <input
              type="date"
              name="leadership_dev_start_date"
              className="form-control"
              id="leadership_dev_start_date"
              onChange={handleLeadershipDevChange}
              value={leadershipDev}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="job_search_start_date">Job Search Start Date</label>
            <input
              type="date"
              name="job_search_start_date"
              className="form-control"
              id="job_search_start_date"
              onChange={handleJobSearchChange}
              value={jobSearch}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="iop_start_date">IOP Start Date</label>
            <input
              type="date"
              name="iop_start_date"
              className="form-control"
              id="iop_start_date"
              onChange={handleIopStartChange}
              value={iopStart}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="iop_end_date">IOP End Date</label>
            <input
              type="date"
              name="iop_end_date"
              className="form-control"
              id="iop_date_end"
              onChange={handleIopEndChange}
              value={iopEnd}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="aftercare_start_date">Aftercare Start Date</label>
            <input
              type="date"
              name="aftercare_start_date"
              className="form-control"
              id="aftercare_start_date"
              onChange={handleAftercareStartChange}
              value={aftercareStart}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="aftercare_end_date">Aftercare End Date</label>
            <input
              type="date"
              name="aftercare_end_date"
              className="form-control"
              id="aftercare_end_date"
              onChange={handleAftercareEndChange}
              value={aftercareEnd}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="ged_start_date">Ged Start Date</label>
            <input
              type="date"
              name="ged_start_date"
              className="form-control"
              id="ged_start_date"
              onChange={handleGedStartChange}
              value={gedStart}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="ged_end_date">GED End Date</label>
            <input
              type="date"
              name="ged_end_date"
              className="form-control"
              id="ged_end_date"
              onChange={handleGedEndChange}
              value={gedEnd}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="cpt_start_date">CPT Start Date</label>
            <input
              type="date"
              name="cpt_start_date"
              className="form-control"
              id="cpt_start_date"
              onChange={handleCptStartChange}
              value={cptStart}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="cpt_end_date">CPT End Date</label>
            <input
              type="date"
              name="cpt_end_date"
              className="form-control"
              id="cpt_end_date"
              onChange={handleCptEndChange}
              value={cptEnd}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="started_mat_date">Started Mat Date</label>
            <input
              type="date"
              name="started_mat_date"
              className="form-control"
              id="started_mat_date"
              onChange={handleMatStartChange}
              value={matStart}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="on_restrictions_date">
              Most Recent On Restrictions Date
            </label>
            <input
              type="date"
              name="on_restrictions_date"
              className="form-control"
              id="on_restrictions_date"
              onChange={handleOnRestrictionsChange}
              value={onRestrictions}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="off_restrictions_date">
              Most Recent Off Restrictions Date
            </label>
            <input
              type="date"
              name="off_restrictions_date"
              className="form-control"
              id="off_restrictions_date"
              onChange={handleOffRestrictionsChange}
              value={offRestrictions}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="drug_test_date">Most Recent Drug Test Date</label>
            <input
              type="date"
              name="drug_test_date"
              className="form-control"
              id="drug_test_date"
              onChange={handleDrugTestChange}
              value={drugTest}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="rec_treatment_update">
              Most Recent Treatment Update
            </label>
            <input
              type="date"
              name="rec_treatment_update"
              className="form-control"
              id="rec_treatment_update"
              onChange={handleRecTreatmentUpdateChange}
              value={recTreatmentUpdate}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="had_counseling">Most Recent Counseling Date</label>
            <input
              type="date"
              name="had_counseling"
              className="form-control"
              id="had_counseling"
              onChange={handleHadCounselingChange}
              value={hadCounseling}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="relapse_date">Most Recent Relapse Date</label>
            <input
              type="date"
              name="relapse_date"
              className="form-control"
              id="relapse_date"
              onChange={handleRelapseDateChange}
              value={relapseDate}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>{" "}
      <Link to={`/participants/dashboard`}>
        <button type="cancel" className="btn btn-primary">
          Return to Dashboard
        </button>
      </Link>
    </form>
  );
}

export default StatusForm;
