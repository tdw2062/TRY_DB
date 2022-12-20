import React, { useEffect, useState } from "react";
import {
  createStatus,
  readInstance,
  updateInstance,
  createInstance,
} from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import instances1 from "./instances.json";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Importer() {
  const [instances, setInstances] = useState(instances1);
  console.log("instances", instances);
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let newParticipant = instances[0];
    newParticipant.participant_id = 1;
    console.log("hey", newParticipant);

    //Load tempObj
    let tempObj = {};

    //Loop through newParticipant and if the key is not blank then load it
    //into tempObj
    for (const key in newParticipant) {
      if (newParticipant[key]) {
        tempObj[key] = newParticipant[key];
      }
    }

    console.log("tempObj", tempObj);

    const participant = { data: tempObj };

    //Make api call to insert temp obj into instances table
    async function newInstance(participant) {
      try {
        const response = await createInstance(participant);
        console.log(response);
      } catch (err) {
        console.log("Error making updateReservation API call: ", err);
        setErrMessage(err);
      }
    }
    await newInstance(participant);
  }

  //Return the html with status drop-down
  return (
    <main>
      <h1>Add Status Event</h1>

      <div class="form-group">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Return to View Participant
          </button>
        </form>
      </div>
    </main>
  );
}

export default Importer;
