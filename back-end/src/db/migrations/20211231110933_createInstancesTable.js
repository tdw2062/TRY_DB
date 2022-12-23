exports.up = function (knex) {
  return knex.schema.createTable("instances", (table) => {
    table.increments("instance_id").primary(); // sets instance_id as the primary key
    table.integer("participant_id").unsigned().notNullable();
    table
      .foreign("participant_id")
      .references("participant_id")
      .inTable("participants");

    table.string("first_name");
    table.string("last_name");
    table.date("birth_date");
    //Begin Enrollment Fields
    table.string("gender");
    table.string("home_county");
    table.string("income_before_try");
    table.string("accounts_before_try");
    table.date("last_use_date");
    table.string("years_inside");
    table.string("sex_offender");
    table.string("recent_stay_length");
    table.string("drug_of_choice");
    table.string("mat_entering_try");
    table.string("tanf");
    table.string("charges");
    table.string("coping_period_length");
    table.string("needs_ged");
    table.string("employment_details");
    table.string("incident_num");
    table.date("start_date");
    table.string("currently_in_program");
    //Begin Status Fields (one-time statuses)
    table.date("off_coping_date");
    table.date("off_coping60_date");
    table.date("employment_start_date");
    table.date("leadership_dev_start_date");
    table.date("job_search_start_date");
    table.date("iop_start_date");
    table.date("iop_end_date");
    table.date("aftercare_start_date");
    table.date("aftercare_end_date");
    table.date("ged_start_date");
    table.date("ged_end_date");
    table.date("cpt_start_date");
    table.date("cpt_end_date");
    table.date("started_mat_date");
    //Begin Status Fields (multiple-time statuses)
    table.date("on_restrictions_date");
    table.date("off_restrictions_date");
    table.date("drug_test_date");
    table.date("rec_treatment_update");
    table.date("had_counseling");
    table.date("relapse_date");
    //Begin Discharge Fields
    table.string("got_checking");
    table.string("got_license");
    table.string("got_savings");
    table.string("program_utilization");
    table.date("discharge_date");
    table.string("discharge_reason");
    table.string("housing_transition");
    table.string("status_at_discharge");
    //Begin Recidivism fields
    table.date("next_check_date");
    table.string("1_YR_Fed");
    table.string("1_YR_State");
    table.string("1_YR_Note");
    table.string("2_YR_Fed");
    table.string("2_YR_State");
    table.string("2_YR_Note");
    table.string("3_YR_Fed");
    table.string("3_YR_State");
    table.string("3_YR_Note");
    table.string("4_YR_Fed");
    table.string("4_YR_State");
    table.string("4_YR_Note");
    table.string("5_YR_Fed");
    table.string("5_YR_State");
    table.string("5_YR_Note");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("instances");
};
