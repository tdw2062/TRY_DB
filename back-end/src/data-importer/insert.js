const knex = require("../db/connection");

//Create a table
function createParticipant(participant) {
  console.log("hello2");
  return knex("participants")
    .insert(participant)
    .returning("*")
    .then((results) => results[0]);
}

let dummyParticipant = {
  first_name: "Kyle",
  last_name: "Hodges",
};

createParticipant(dummyParticipant);
