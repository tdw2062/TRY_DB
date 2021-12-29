const knex = require("../db/connection");

//Create a table
function createStatus(status) {
  return knex("statuses")
    .insert(status)
    .returning("*")
    .then((results) => results[0]);
}

//Get one table by table_id
function read(status_id) {
  return knex("statuses").select("*").where({ status_id }).first();
}

//List all tables
function list() {
  return knex("statuses").select("*").orderBy("status_id");
}

//Modify a given participant by statusId
function update(updatedStatus, statusId) {
  return knex("statuses")
    .select("*")
    .where({ status_id: statusId })
    .update(updatedStatus, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  createStatus,
  list,
  read,
  update,
};
