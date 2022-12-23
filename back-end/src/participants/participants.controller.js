const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for participant resources
 */

const participantsService = require("./participants.service.js");

//Helper function that determines if a given participant exists (by tableId)
async function participantExists(req, res, next) {
  const participant = await participantsService.read(req.params.participantId);
  //If a participant is found, save in locals, otherwise throw an error
  if (participant) {
    res.locals.participant = participant;
    return next();
  }
  next({
    status: 404,
    message: `Participant ${req.params.participantId} cannot be found.`,
  });
}

//List a specific participant based on participantId in url
async function read(req, res, next) {
  res.json({ data: res.locals.participant });
}

//List all of the participants
async function list(req, res, next) {
  const params = req.query;
  const data = await participantsService.list(params);
  res.json({ data });
}

//Create a participant based on the request body data
async function createParticipant(req, res, next) {
  console.log("request body", req.body.data);
  const data = await participantsService.createParticipant(req.body.data);
  console.log("response data", data);
  res.status(201).json({ data });
}

//Update the participant and then update first_name and last_name
//in both the instances and statuses table
async function update(req, res, next) {
  //Update the participant
  console.log("request body", req.body.data);
  const response = await participantsService.update(
    req.body.data,
    req.params.participantId
  );
  console.log("This is the response", response);
  //Make object to update instances table
  const instanceObj = {
    first_name: response.first_name,
    last_name: response.last_name,
    birth_date: response.dob,
  };

  const response2 = await participantsService.updateInstance(
    instanceObj,
    response.participant_id
  );

  //Make object to update statuses table
  const statusObj = {
    first_name: instanceObj.first_name,
    last_name: instanceObj.last_name,
  };

  const response3 = await participantsService.updateStatus(
    statusObj,
    response.participant_id
  );

  res.json({ data: response });
}

//Delete a specific instance (by instance_id)
async function destroy(req, res) {
  console.log("request given", req);
  await participantsService.destroy(Number(req.params.participantId));
  res.sendStatus(204);
}

module.exports = {
  createParticipant: asyncErrorBoundary(createParticipant),
  destroy: asyncErrorBoundary(destroy),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(participantExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
