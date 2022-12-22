/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./statuses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Route to create a new participant
router
  .route("/")
  .get(controller.list)
  .post(controller.createStatus)
  .all(methodNotAllowed);

//Route to get a specific participant
router
  .route("/:statusId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
