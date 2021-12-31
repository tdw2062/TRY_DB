/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./instance.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Route to create a new instance
router
  .route("/")
  .get(controller.list)
  .post(controller.createInstance)
  .all(methodNotAllowed);

//Route to get a specific instance
router
  .route("/:instanceId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
