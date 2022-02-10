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
  handleRecentStayLength,
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
      <div className="form-group">
        <label htmlFor="start_date">Start Date</label>
        <input
          type="text"
          name="start_date"
          className="form-control"
          id="start_date"
          onChange={handleStartDateChange}
          value={startDate}
        />
      </div>
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
