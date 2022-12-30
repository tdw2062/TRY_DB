const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const statusesService = require("../statuses/statuses.service.js");
const instancesService = require("../instances/instances.service.js");

//Update the instance
async function update(req, res, next) {
  //Create a status object based on request and update status in table
  const newInstanceObj = req.body.data;
  //Save "note" to a variable and then delete it from instance object
  const note = newInstanceObj.note;
  delete newInstanceObj.note;

  //Update the instance
  const response = await instancesService.update(
    newInstanceObj,
    req.params.instanceId
  );

  console.log("here is instance obj", newInstanceObj);
  //If there is a "program_utilization" key then create a new status event
  if (newInstanceObj.program_utilization) {
    let newStatusObj = {};
    newStatusObj.instance_id = newInstanceObj.instance_id;
    newStatusObj.first_name = newInstanceObj.first_name;
    newStatusObj.last_name = newInstanceObj.last_name;
    newStatusObj.status_name = "Changed Program Utilization Success";
    newStatusObj.date = minusOneYear(newInstanceObj.next_check_date);
    newStatusObj.participant_id = newInstanceObj.participant_id;
    newStatusObj.incident_num = newInstanceObj.incident_num;
    newStatusObj.notes = note;
    console.log("newStatusObj", newStatusObj);
    const response2 = await statusesService.createStatus(newStatusObj);
    console.log("status response", response2);
  }

  res.json({ data: response });
}

//To change date of current check into next_check_date
function minusOneYear(input) {
  const year = Number(input.substring(0, 4)) - 1;
  console.log("return value", year + input.substring(4));
  return year + input.substring(4);
}

module.exports = {
  update: asyncErrorBoundary(update),
};
