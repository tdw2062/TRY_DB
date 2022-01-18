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
          incident_num: 1,
          start_date: "01-02-2019",
          discharge_reason: "Got Employment",
          housing_transition: "02-05-2020",
          status_at_discharge: "Leadership Development",
          discharge_date: "02-02-2020",
          iop_start_date: "12-01-2021",
          iop_end_date: "01-15-2022",
          iop_week_date: "01-15-2022",
          started_mat_date: "01-15-2022",
          aftercare_start_date: "02-01-2022",
          aftercare_8week_date: "04-01-2022",
          aftercare_end_date: "04-15-2022",
          adm_start_date: "03-01-2022",
          adm_fund: "yes",
          adm_days: 100,
          tu_status_adm: "Current",
          adm_90: "06-01-2022",
          adm_180: "09-01-2022",
          last_adm_date: "10-01-2022",
        },
        {
          participant_id: 2,
          first_name: "Tim",
          last_name: "Clinton",
          incident_num: 1,
          start_date: "01-01-2020",
          discharge_reason: "Got Employment",
          housing_transition: "01-05-2021",
          status_at_discharge: "Leadership Development",
          discharge_date: "01-02-2021",
          iop_start_date: "12-01-2021",
          iop_end_date: "01-15-2022",
          iop_week_date: "01-15-2022",
          started_mat_date: "01-15-2022",
          aftercare_start_date: "02-01-2022",
          aftercare_8week_date: "04-01-2022",
          aftercare_end_date: "04-15-2022",
          adm_start_date: "03-01-2022",
          adm_fund: "yes",
          adm_days: 100,
          tu_status_adm: "Current",
          adm_90: "06-01-2022",
          adm_180: "09-01-2022",
          last_adm_date: "10-01-2022",
        },
      ]);
    });
};
