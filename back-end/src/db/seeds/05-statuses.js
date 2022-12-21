exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("statuses").insert([
        {
          instance_id: 1,
          participant_id: 1,
          first_name: "Mike",
          last_name: "Jones",
          incident_num: "1",
          status_name: "Had Individual Counseling",
          date: "02/02/2022",
          notes: "went well",
        },
        {
          instance_id: 1,
          participant_id: 1,
          first_name: "Mike",
          last_name: "Jones",
          incident_num: "1",
          status_name: "Off Coping Date",
          date: "02/03/2022",
          notes: "everything fine",
        },
        {
          instance_id: 2,
          participant_id: 2,
          first_name: "Tim",
          last_name: "Clinton",
          incident_num: "1",
          status_name: "Off Coping +60",
          date: "02/04/2022",
          notes: "there are concerns",
        },
        {
          instance_id: 2,
          participant_id: 2,
          first_name: "Tim",
          last_name: "Clinton",
          incident_num: "1",
          status_name: "Had Individual Counseling",
          date: "02/06/2022",
          notes: "needs follow up",
        },
      ]);
    });
};
