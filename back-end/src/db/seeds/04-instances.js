exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instances")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instances").insert([
        {
          participant_id: 1,
          first_name: "Mike",
          last_name: "Jones",
          birth_date: "02-02-1982",
          //Begin Enrollment Fields
          gender: "male",
          home_county: "Summit",
          income_before_try: "30,000k",
          accounts_before_try: "No",
          last_use_date: "04-02-2020",
          years_inside: 3,
          sex_offender: "yes",
          recent_stay_length: "6 months",
          drug_of_choice: "crack",
          mat_entering_try: "Yes",
          tanf: "No",
          charges: "Assault & battery",
          coping_period_length: "90 days",
          needs_ged: "Yes",
          employment_details: "Obtained employment outside TRY",
          incident_num: 1,
          start_date: "01-02-2019",
          currently_in_program: "yes",

          //Begin Discharge Fields
          //got_checking:"02-05-2020",
          //got_license:"02-05-2020",
          //got_savings: "02-05-2020",
          //program_utilization:"Yes",
          //discharge_date: "02-02-2020",
          //discharge_reason: "Got Employment",
          //housing_transition: "02-05-2020",
          //status_at_discharge: "Leadership Development"
        },
        {
          participant_id: 2,
          first_name: "Tim",
          last_name: "Clinton",
          birth_date: "06-02-1984",
          //Begin Enrollment Fields
          gender: "male",
          home_county: "Summit",
          income_before_try: "20,000k",
          accounts_before_try: "Yes",
          last_use_date: "03-02-2019",
          years_inside: 3,
          sex_offender: "yes",
          recent_stay_length: "6 months",
          drug_of_choice: "crack",
          mat_entering_try: "Yes",
          tanf: "No",
          charges: "Robbery",
          coping_period_length: "60 days",
          needs_ged: "Yes",
          employment_details: "Obtained employment outside TRY",
          incident_num: 1,
          start_date: "03-01-2019",
          currently_in_program: "yes",

          //Begin Discharge Fields
          //got_checking:"02-05-2020",
          //got_license:"02-05-2020",
          //got_savings: "02-05-2020",
          //program_utilization:"Yes",
          //discharge_date: "02-02-2020",
          //discharge_reason: "Got Employment",
          //housing_transition: "02-05-2020",
          //status_at_discharge: "Leadership Development"
        },
      ]);
    });
};
