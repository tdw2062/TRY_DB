const knex = require("../db/connection");

//Create a table
function createParticipant(participant) {
  console.log("hello2");
  return knex("participants")
    .insert(participant)
    .returning("*")
    .then((results) => results[0]);
}

//Get one table by table_id
function read(participant_id) {
  return knex("participants").select("*").where({ participant_id }).first();
}

//List all tables
function list(params) {
  return knex("participants")
    .select("*")
    .where(params)
    .orderBy("participant_id");
}

//Modify a given participant by participantId
function update(updatedParticipant, participantId) {
  return knex("participants")
    .select("*")
    .where({ participant_id: participantId })
    .update(updatedParticipant, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//Modify a given participant by participantId
function updateInstance(updatedInstance, participantId) {
  return knex("instances")
    .select("*")
    .where({ participant_id: participantId })
    .update(updatedInstance, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//Modify a given participant by participantId
function updateStatus(updatedStatus, participantId) {
  return knex("statuses")
    .select("*")
    .where({ participant_id: participantId })
    .update(updatedStatus, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//Delete a status by status_id
function destroy(participant_id) {
  return knex("participants").where({ participant_id }).del();
}

module.exports = {
  createParticipant,
  destroy,
  list,
  read,
  update,
  updateInstance,
  updateStatus,
};
