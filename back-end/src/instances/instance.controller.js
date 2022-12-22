const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

const instancesService = require("./instances.service.js");

//Helper function that determines if a given instance exists (by tableId)
async function instanceExists(req, res, next) {
  const instance = await instancesService.read(req.params.instanceId);
  //If an instance is found, save in locals, otherwise throw an error
  if (instance) {
    res.locals.instance = instance;
    return next();
  }
  next({
    status: 404,
    message: `instance ${req.params.instanceId} cannot be found.`,
  });
}

//List a specific instance based on instanceId in url
async function read(req, res, next) {
  res.json({ data: res.locals.instance });
}

//List all of the instances
async function list(req, res, next) {
  console.log("we here!");
  const params = req.query;
  console.log("params in controller", params);
  const data = await instancesService.list(params);
  res.json({ data });
}

//Create an instance based on the request body data
async function createInstance(req, res, next) {
  const data = await instancesService.createInstance(req.body.data);
  res.status(201).json({ data });
}

//Update the instance
async function update(req, res, next) {
  //Update the instance
  const response = await instancesService.update(
    req.body.data,
    req.params.instanceId
  );
  res.json({ data: response });
}

//Delete a specific instance (by instance_id)
async function destroy(req, res) {
  console.log("request given", req);
  await instancesService.destroy(Number(req.params.instanceId));
  res.sendStatus(204);
}

module.exports = {
  createInstance: asyncErrorBoundary(createInstance),
  destroy: asyncErrorBoundary(destroy),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(instanceExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
