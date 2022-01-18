const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const participantsRouter = require("./participants/participants.router");
const statusesRouter = require("./statuses/statuses.router");
const instancesRouter = require("./instances/instances.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/participants", participantsRouter);
app.use("/statuses", statusesRouter);
app.use("/instances", instancesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
