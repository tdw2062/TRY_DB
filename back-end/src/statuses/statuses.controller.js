const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const statusesService = require("./statuses.service.js");
const instancesService = require("../instances/instances.service.js");

//Helper function that determines if a given status exists (by tableId)
async function statusExists(req, res, next) {
  const status = await statusesService.read(req.params.statusId);
  //If a status is found, save in locals, otherwise throw an error
  if (status) {
    res.locals.status = status;
    return next();
  }
  next({
    status: 404,
    message: `Status ${req.params.statusId} cannot be found.`,
  });
}

//List a specific status based on participantId in url
async function read(req, res, next) {
  res.json({ data: res.locals.status });
}

//List all of the statuses
async function list(req, res, next) {
  const params = req.query;
  if (params.instance_id) params.instance_id = Number(params.instance_id);
  console.log("controller params", params);
  const data = await statusesService.list(params);
  console.log("data", data);
  res.json({ data });
}

//Create a status based on the request body data
async function createStatus(req, res, next) {
  const newStatusObj = req.body.data;
  const data = await statusesService.createStatus(newStatusObj);
  const [year, month, day] = newStatusObj.date.split("-");
  const statusDate = new Date(year, month - 1, day);
  console.log("statusDate", statusDate);
  const statusNameObj = statusLookup(newStatusObj.status_name);
  const instanceGrabbed = await instancesService.read(newStatusObj.instance_id);
  const dateOfInstance = instanceGrabbed[statusNameObj.statusField];
  const insertObj = {};
  insertObj[statusNameObj.statusField] = statusDate;
  if (statusDate > dateOfInstance) {
    await instancesService.update(insertObj, newStatusObj.instance_id);
    console.log("date updated");
  }

  res.status(201).json({ data });
}

//Update the status
async function update(req, res, next) {
  //Update the status
  const response = await statusesService.update(
    req.body.data,
    req.params.statusId
  );
  res.json({ data: response });
}

//Delete a specific status (by status_id)
async function destroy(req, res) {
  console.log("request given", req);
  await statusesService.destroy(Number(req.params.statusId));
  res.sendStatus(204);
}

function statusLookup(description) {
  const statusArray = [
    { statusField: "off_coping_date", statusDescr: "Off Coping Date" },
    { statusField: "off_coping60_date", statusDescr: "Off Coping +60" },
    {
      statusField: "on_restrictions_date",
      statusDescr: "On Restrictions Date",
    },
    {
      statusField: "off_restrictions_date",
      statusDescr: "Off Restrictions Date",
    },
    {
      statusField: "employment_start_date",
      statusDescr: "Employment Start Date",
    },
    {
      statusField: "leadership_dev_start_date",
      statusDescr: "Leadership Development Start Date",
    },
    {
      statusField: "job_search_start_date",
      statusDescr: "Job Search Start Date",
    },
    { statusField: "iop_start_date", statusDescr: "IOP Start Date" },
    { statusField: "iop_end_date", statusDescr: "IOP End Date" },
    {
      statusField: "aftercare_start_date",
      statusDescr: "Aftercare Start Date",
    },
    { statusField: "aftercare_end_date", statusDescr: "Aftercare End Date" },
    { statusField: "ged_start_date", statusDescr: "GED Start Date" },
    { statusField: "ged_end_date", statusDescr: "GED End Date" },
    { statusField: "cpt_start_date", statusDescr: "CPT Start Date" },
    { statusField: "cpt_end_date", statusDescr: "CPT End Date" },
    {
      statusField: "rec_treatment_update",
      statusDescr: "Received Treatment Update",
    },
    { statusField: "had_counseling", statusDescr: "Had Individual Counseling" },
    { statusField: "relapse_date", statusDescr: "Relapse Date" },
    { statusField: "drug_test_date", statusDescr: "Drug Test Date" },
    { statusField: "started_mat_date", statusDescr: "Started MAT" },
  ];

  return statusArray.find(({ statusDescr }) => statusDescr === description);
}

module.exports = {
  createStatus: asyncErrorBoundary(createStatus),
  destroy: asyncErrorBoundary(destroy),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(statusExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
