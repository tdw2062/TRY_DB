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
  if (!params.hasOwnProperty("month")) {
    console.log("today empty");
    return knex("instances").select("*").where(params).orderBy("instance_id");
  } else if (params.month === "") {
    console.log("today blank");
    return knex("instances").select("*").orderBy("instance_id");
  } else {
    console.log("today filled in");
    let newDate = new Date();
    newDate.setFullYear(params.year);
    newDate.setMonth(params.month);
    newDate.setDate(params.day);
    console.log("newDate", newDate);
    return knex("instances")
      .select("*")
      .where("next_check_date", "<", newDate)
      .orderBy("instance_id");
  }
}

//Modify a given instance by instanceId
function update(updatedInstance, instanceId) {
  return knex("instances")
    .select("*")
    .where({ instance_id: instanceId })
    .update(updatedInstance, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//Delete a status by status_id
function destroy(instance_id) {
  return knex("instances").where({ instance_id }).del();
}

module.exports = {
  createInstance,
  destroy,
  list,
  read,
  update,
};
