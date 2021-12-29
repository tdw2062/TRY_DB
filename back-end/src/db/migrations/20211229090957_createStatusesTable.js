//Create the statuses table
exports.up = function (knex) {
  return knex.schema.createTable("statuses", (table) => {
    table.increments("status_id").primary(); // sets status_id as the primary key
    table.integer("participant_id");
    table.integer("instance_id");
    table.string("status_name");
    table.date("date");
    table.string("program_status");
    table.string("notes");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("statuses");
};
