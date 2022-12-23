//Create the statuses table
exports.up = function (knex) {
  return knex.schema.createTable("statuses", (table) => {
    table.increments("status_id").primary(); // sets status_id as the primary key

    table.foreign("instance_id").references("instance_id").inTable("instances");

    table.integer("participant_id").unsigned().notNullable;
    table
      .foreign("participant_id")
      .references("participant_id")
      .inTable("participants");

    table.integer("instance_id").unsigned().notNullable;
    table.string("first_name");
    table.string("last_name");
    table.string("incident_num");
    table.string("status_name");
    table.date("date");
    table.string("notes");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("statuses");
};
