/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./participants.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Route to create a new participant
router
  .route("/")
  .get(controller.list)
  .post(controller.createParticipant)
  .all(methodNotAllowed);

//Route to get a specific participant
router
  .route("/:participantId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
