//The Seat Button is used to seat a reservation
//The button will appear next to a reservation on the Dashboard
//The two props are visibility and reservationId

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ParticipantMenu() {
  return (
    <div class="btn-group-vertical">
      <Link to="/participants/1/view">
        <button type="button" class="btn btn-secondary">
          View Participant Info
        </button>
      </Link>
      <br />
      <Link to="/participants/1/view">
        <button type="button" class="btn btn-secondary">
          View Documents
        </button>
      </Link>
      <br />
      <Link to="/participants/1/employment">
        <button type="button" class="btn btn-secondary">
          View Employment Info
        </button>
      </Link>
      <br />
      <Link to="/participants/1/treatment">
        <button type="button" class="btn btn-secondary">
          View Treatment Info
        </button>
      </Link>
      <br />
      <Link to="/participants/1/adm">
        <button type="button" class="btn btn-secondary">
          View ADM Info
        </button>
      </Link>
      <br />
      <Link to="/participants/1/discharge">
        <button type="button" class="btn btn-secondary">
          View Discharge Info
        </button>
      </Link>
      <br />
    </div>
  );
}

export default ParticipantMenu;
