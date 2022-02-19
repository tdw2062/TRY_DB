//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";

function EnrollForm({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  gender,
  handleGenderChange,
  dob,
  handleDobChange,
  homeCounty,
  handleHomeCountyChange,
  incidentNum,
  handleIncidentNumChange,
  incomeBefore,
  handleIncomeBeforeChange,
  accountsPrior,
  handleAccountsPriorChange,
  lastUseDate,
  handleLastUseChange,
  yearsInside,
  handleYearsInsideChange,
  sexOff,
  handleSexOffChange,
  recentStayLength,
  handleRecentStayLengthChange,
  drugChoice,
  handleDrugChoiceChange,
  startDate,
  handleStartDateChange,
  mat,
  handleMatChange,
  tanf,
  handleTanfChange,
  chargesDescr,
  handleChargesDescrChange,
  copingLength,
  handleCopingLengthChange,
  needsGed,
  handleNeedsGedChange,
  employmentDetails,
  handleEmploymentDetailsChange,
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
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              className="form-control"
              id="gender"
              onChange={handleGenderChange}
              value={gender}
            />
          </div>
        </div>
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
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="home_county">Home County</label>
            <input
              type="text"
              name="home_county"
              className="form-control"
              id="home_county"
              onChange={handleHomeCountyChange}
              value={homeCounty}
            />
          </div>
        </div>
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
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="income_before">Income Before Entering TRY</label>
            <input
              type="text"
              name="income_before"
              className="form-control"
              id="income_before"
              onChange={handleIncomeBeforeChange}
              value={incomeBefore}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="accounts_prior">Had Accounts Before TRY?</label>
            <input
              type="text"
              name="accounts_prior"
              className="form-control"
              id="accounts_prior"
              onChange={handleAccountsPriorChange}
              value={accountsPrior}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="last_use_date">Last Use Date</label>
            <input
              type="text"
              name="last_use_date"
              className="form-control"
              id="last_use_date"
              onChange={handleLastUseChange}
              value={lastUseDate}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="years_inside">Years on the Inside</label>
            <input
              type="text"
              name="years_inside"
              className="form-control"
              id="years_inside"
              onChange={handleYearsInsideChange}
              value={yearsInside}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="sex_offender">Sex Offender?</label>
            <input
              type="text"
              name="sex_offender"
              className="form-control"
              id="sex_offender"
              onChange={handleSexOffChange}
              value={sexOff}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="recent_length">Recent Stay Length</label>
            <input
              type="text"
              name="recent_length"
              className="form-control"
              id="recent_length"
              onChange={handleRecentStayLengthChange}
              value={recentStayLength}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="drug_of_choice">Drug of Choice?</label>
            <input
              type="text"
              name="drug_of_choice"
              className="form-control"
              id="drug_of_choice"
              onChange={handleDrugChoiceChange}
              value={drugChoice}
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
            <label htmlFor="mat">MAT</label>
            <input
              type="text"
              name="mat"
              className="form-control"
              id="mat"
              onChange={handleMatChange}
              value={mat}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="tanf">TANF</label>
            <input
              type="text"
              name="tanf"
              className="form-control"
              id="tanf"
              onChange={handleTanfChange}
              value={tanf}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="charges_descr">Charges Description:</label>
            <input
              type="text"
              name="charges_descr"
              className="form-control"
              id="charges_descr"
              onChange={handleChargesDescrChange}
              value={chargesDescr}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="coping_length">Coping Length:</label>
            <input
              type="text"
              name="coping_length"
              className="form-control"
              id="coping_length"
              onChange={handleCopingLengthChange}
              value={copingLength}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label htmlFor="needs_ged">Needs GED?:</label>
            <input
              type="text"
              name="needs_ged"
              className="form-control"
              id="needs_ged"
              onChange={handleNeedsGedChange}
              value={needsGed}
            />
          </div>
        </div>
        <div class="col">
          <div className="form-group">
            <label htmlFor="employment_details">Employment Details:</label>
            <input
              type="text"
              name="employment_details"
              className="form-control"
              id="employment_details"
              onChange={handleEmploymentDetailsChange}
              value={employmentDetails}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>{" "}
      <button type="cancel" className="btn btn-primary" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EnrollForm;
