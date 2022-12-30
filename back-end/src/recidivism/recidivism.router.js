/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./recidivism.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Route to update a specific instance
router.route("/:instanceId").put(controller.update).all(methodNotAllowed);

module.exports = router;
