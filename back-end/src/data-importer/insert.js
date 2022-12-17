const knex = require("../db/connection");

//Create a table
function createInstance(instance) {
  return knex("instances")
    .insert(instance)
    .returning("*")
    .then((results) => results[0]);
}

let dummyInstance = { first_name: "Kyle", last_name: "Hodges" };
createInstance(dummyInstance);
