exports.up = function (knex) {
  return knex.schema.createTable("instances", (table) => {
    table.increments("instance_id").primary(); // sets instance_id as the primary key
    table.integer("participant_id").unsigned().notNullable();
    table
      .foreign("participant_id")
      .references("participant_id")
      .inTable("participants")
      .onDelete("cascade");
    table.string("first_name");
    table.string("last_name");
    table.string("incident_num");
    table.date("start_date");
    table.date("discharge_date");
    table.date("next_check_date");
    table.string("1_YR");
    table.string("2_YR");
    table.string("3_YR");
    table.string("4_YR");
    table.string("5_YR");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("instances");
};
