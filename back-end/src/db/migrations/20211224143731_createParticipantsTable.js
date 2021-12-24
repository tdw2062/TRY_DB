//Create the tables table
exports.up = function (knex) {
  return knex.schema.createTable("participants", (table) => {
    table.increments("participant_id").primary(); // sets table_id as the primary key
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("participants");
};
