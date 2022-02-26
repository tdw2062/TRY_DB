const knex = require("../db/connection");

//Create a table
function createInstance(instance) {
  return knex("instances")
    .insert(instance)
    .returning("*")
    .then((results) => results[0]);
}

//Get one table by table_id
function read(instance_id) {
  return knex("instances").select("*").where({ instance_id }).first();
}

//List all tables
function list(params) {
  return knex("instances").select("*").where(params).orderBy("instance_id");
}

//Modify a given instance by instanceId
function update(updatedInstance, instanceId) {
  return knex("instances")
    .select("*")
    .where({ instance_id: instanceId })
    .update(updatedInstance, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  createInstance,
  list,
  read,
  update,
};
