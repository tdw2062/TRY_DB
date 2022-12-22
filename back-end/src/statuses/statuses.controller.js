const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const statusesService = require("./statuses.service.js");

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
  const data = await statusesService.createStatus(req.body.data);
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

module.exports = {
  createStatus: asyncErrorBoundary(createStatus),
  destroy: asyncErrorBoundary(destroy),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(statusExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
