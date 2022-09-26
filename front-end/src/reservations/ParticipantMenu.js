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
        Edit Participant Info
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View Documents
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View Employment Info
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View Treatment Info
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View ADM Info
      </button>
      <br />
      <button type="button" class="btn btn-secondary">
        View Discharge Info
      </button>
      <br />
    </div>
  );
}

export default ParticipantMenu;
