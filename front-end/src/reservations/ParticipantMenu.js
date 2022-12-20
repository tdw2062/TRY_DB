//This is the Participant Menu
//Currently the links do not work
/*To restore the links, add the link tags around the buttons with the location such as this:
<Link to={`/participants/${instanceId}/edit`}>
        <button type="button" class="btn btn-secondary">
          Edit Participant Info
        </button>
</Link>
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ParticipantMenu({ instanceId }) {
  return (
    <div class="btn-group-vertical">
      <button type="button" class="btn btn-secondary">
        View/Edit Enrollment Info
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View/Edit One-Time Statuses
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View/Edit Multiple STatuses
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View/Edit Discharge Fields
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View/Edit Recidivism Fields
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        Go Back
      </button>
      <br />
    </div>
  );
}

export default ParticipantMenu;
