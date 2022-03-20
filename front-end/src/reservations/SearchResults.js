//The SearchResults component is used to show the results from the search for reservations by phone number
//It is used on the Search component

import React from "react";

function SearchResults({ visibility, last_name, instances }) {
  //Create table rows of the reservations to display in the search results
  //Use the reservations state array to create the arrows.
  const instanceLinks = instances.map((instance) => {
    let startDateString = "";
    if (instance.start_date)
      startDateString = instance.start_date.substring(0, 10);

    let jobDateString = "";
    if (instance.job_search_start)
      jobDateString = instance.job_search_start.substring(0, 10);
    return (
      <tr key={instance.instance_id}>
        <td>{instance.first_name}</td>
        <td>{instance.last_name}</td>
        <td>{startDateString}</td>
        <td>{instance.coping_period_length}</td>
        <td>{jobDateString}</td>
      </tr>
    );
  });

  if (visibility !== null) {
    if (instances.length === 0) {
      return (
        <div>
          <h1>No participant instances found</h1>
        </div>
      );
    } else {
      //Return the results as a table
      return (
        <div>
          <h1>Instances found for {last_name}</h1>
          <table class="table">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Coping Period Length</th>
            <th>Job Search Start</th>
            {instanceLinks}
          </table>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default SearchResults;
