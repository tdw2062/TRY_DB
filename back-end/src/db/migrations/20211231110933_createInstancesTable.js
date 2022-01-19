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
    table.date("adm_start_date");
    table.string("adm_fund");
    table.integer("adm_days");
    table.string("tu_status_adm");
    table.date("adm_90");
    table.date("adm_180");
    table.date("last_adm_date");
    table.date("iop_start_date");
    table.date("iop_end_date");
    table.date("iop_week_date");
    table.date("started_mat_date");
    table.date("aftercare_start_date");
    table.date("aftercare_8week_date");
    table.date("aftercare_end_date");
    table.date("ged_start_date");
    table.date("ged_end_date");
    table.date("job_search_start");
    table.date("leadership_dev_start");
    table.date("last_ld_meeting");
    table.string("employment_details");
    table.date("discharge_date");
    table.string("discharge_reason");
    table.date("housing_transition");
    table.string("status_at_discharge");
    table.date("next_check_date");
    table.string("1_YR_Fed");
    table.string("1_YR_State");
    table.string("2_YR_Fed");
    table.string("2_YR_State");
    table.string("3_YR_Fed");
    table.string("3_YR_State");
    table.string("4_YR_Fed");
    table.string("4_YR_State");
    table.string("5_YR_Fed");
    table.string("5_YR_State");

    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("instances");
};
