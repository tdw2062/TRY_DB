//The SearchResults component is used to show the results from the search for reservations by phone number
//It is used on the Search component

import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteParticipant } from "../utils/api";

function SearchResults({ visibility, last_name, filteredParticipants }) {
  //Create table rows of the reservations to display in the search results
  //Use the reservations state array to create the arrows.

  const history = useHistory();

  //Function to delete participant
  async function handleDelete(participant_id) {
    console.log("here is the instance id", participant_id);

    if (
      window.confirm(
        "Are you sure want to delete this participant? (Note: All instances AND statuses associated with this participant must be deleted or this delete will not process.)"
      ) == true
    ) {
      try {
        await deleteParticipant(participant_id);
      } catch (err) {
        console.log("Error making API call: ", err);
      }

      history.go(0);
    } else {
    }
  }

  const participantLinks = filteredParticipants.map((participant) => {
    let dobString = "";
    if (participant.dob) dobString = participant.dob.substring(0, 10);
    return (
      <tr key={participant.participant_id}>
        <td>{participant.first_name}</td>
        <td>{participant.last_name}</td>
        <td>{dobString}</td>
        <Link to={`/participants/${participant.participant_id}/view`}>
          <button
            type="button"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Select Participant
          </button>
        </Link>

        <button
          type="button"
          class="btn btn-primary"
          style={{ margin: "5px" }}
          onClick={() => {
            handleDelete(participant.participant_id);
          }}
        >
          Delete Participant
        </button>
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
