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

function ParticipantMenu2({ participantId }) {
  return (
    <div class="btn-group-vertical">
      <button type="button" class="btn btn-secondary">
        View/Edit Participant Info
      </button>
      <br />
      <Link to={`/participants/${participantId}/all_statuses`}>
        <button type="button" class="btn btn-secondary">
          View/Edit All Statuses
        </button>
      </Link>{" "}
      <br />
      <button type="button" class="btn btn-secondary">
        Go Back
      </button>
      <br />
    </div>
  );
}

export default ParticipantMenu2;
