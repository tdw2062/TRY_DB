const knex = require("../db/connection");

//Create a table
function createParticipant(participant) {
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
function list() {
  return knex("participants").select("*").orderBy("participant_id");
}

module.exports = {
  createParticipant,
  list,
  read,
};
