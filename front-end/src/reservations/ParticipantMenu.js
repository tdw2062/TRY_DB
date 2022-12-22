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

function ParticipantMenu({ instanceId, participantId }) {
  return (
    <div class="btn-group-vertical">
      <Link to={`/instances/${instanceId}/enrollEdit`}>
        <button type="button" class="btn btn-secondary">
          View/Edit Enrollment Info
        </button>
      </Link>
      <br />
      <Link to={`/instances/${instanceId}/statusEdit`}>
        <button type="button" class="btn btn-secondary">
          View/Edit Statuses of Instance
        </button>
      </Link>
      <br />
      <Link to={`/instances/${instanceId}/dischargeEdit`}>
        <button type="button" class="btn btn-secondary">
          View/Edit Discharge Fields
        </button>
        <br />
        <br />
      </Link>
      <Link to={`/instances/${instanceId}/recEdit`}>
        <button type="button" class="btn btn-secondary">
          View/Edit Recidivism Fields
        </button>
        <br />
        <br />
      </Link>
      <Link to={`/participants/${participantId}/view`}>
        <button type="button" class="btn btn-secondary">
          Return to Previous
        </button>
        <br />
      </Link>
    </div>
  );
}

export default ParticipantMenu;
