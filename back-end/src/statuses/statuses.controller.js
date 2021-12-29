const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

const statusesService = require("./statuses.service.js");

//Helper function that determines if a given table exists (by tableId)
async function statusExists(req, res, next) {
  const status = await statusesService.read(req.params.statusId);
  //If a table is found, save in locals, otherwise throw an error
  if (status) {
    res.locals.status = status;
    return next();
  }
  next({
    status: 404,
    message: `Status ${req.params.statusId} cannot be found.`,
  });
}

//List a specific participant based on participantId in url
async function read(req, res, next) {
  res.json({ data: res.locals.status });
}

//List all of the participants
async function list(req, res, next) {
  const data = await statusesService.list();
  res.json({ data });
}

//Create a table based on the request body data
async function createStatus(req, res, next) {
  const data = await statusesService.createStatus(req.body.data);
  res.status(201).json({ data });
}

//Update the reservation
async function update(req, res, next) {
  //Update the reservation
  const response = await statusesService.update(
    req.body.data,
    req.params.statusId
  );
  res.json({ data: response });
}

module.exports = {
  createStatus: asyncErrorBoundary(createStatus),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(statusExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
