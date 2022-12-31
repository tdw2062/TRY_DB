//The CapacityError is used to notify that the capacity is less than the party
//The only prop is visibility

import React from "react";

function DateError({ visibility }) {
  if (visibility !== null) {
    return (
      <div class="alert alert-danger" role="alert">
        You must include a discharge date.
      </div>
    );
  } else {
    return null;
  }
}

export default DateError;
