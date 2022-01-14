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
        },
      ]);
    });
};
