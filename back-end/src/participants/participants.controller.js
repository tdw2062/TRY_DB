const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

const participantsService = require("./participants.service.js");

//Helper function that determines if a given table exists (by tableId)
async function participantExists(req, res, next) {
  const participant = await participantsService.read(req.params.participantId);
  //If a table is found, save in locals, otherwise throw an error
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
  const data = await participantsService.list();
  res.json({ data });
}

//Create a table based on the request body data
async function createParticipant(req, res, next) {
  const data = await participantsService.createParticipant(req.body.data);
  res.status(201).json({ data });
}

//Update the reservation
async function update(req, res, next) {
  //Update the reservation
  const response = await participantsService.update(
    req.body.data,
    req.params.participantId
  );
  res.json({ data: response });
}

module.exports = {
  createParticipant: asyncErrorBoundary(createParticipant),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(participantExists), asyncErrorBoundary(read)],
  update: asyncErrorBoundary(update),
};
