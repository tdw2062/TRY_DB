//The SearchResults component is used to show the results from the search for reservations by phone number
//It is used on the Search component

import React from "react";

function SearchResults({ visibility, last_name, filteredParticipants }) {
  //Create table rows of the reservations to display in the search results
  //Use the reservations state array to create the arrows.
  const participantLinks = filteredParticipants.map((participant) => {
    let dobString = "";
    if (participant.dob) dobString = participant.dob.substring(0, 10);
    return (
      <tr key={participant.participant_id}>
        <td>{participant.first_name}</td>
        <td>{participant.last_name}</td>
        <td>{dobString}</td>
      </tr>
    );
  });

  if (visibility !== null) {
    if (filteredParticipants.length === 0) {
      return (
        <div>
          <h1>No participant instances found</h1>
        </div>
      );
    } else {
      //Return the results as a table
      return (
        <div>
          <h1>Results found for {last_name}</h1>
          <table class="table">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>

            {participantLinks}
          </table>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default SearchResults;
