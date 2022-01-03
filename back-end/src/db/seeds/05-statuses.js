exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("statuses").insert([
        {
          participant_id: 1,
          instance_id: 1,
          status_name: "Had RC",
          date: "02/02/2022",
          program_status: "Coping Period",
          notes: "went well",
        },
        {
          participant_id: 2,
          instance_id: 2,
          status_name: "Off Coping Period",
          date: "02/03/2022",
          program_status: "Off Coping Period",
          notes: "everything fine",
        },
        {
          participant_id: 3,
          instance_id: 1,
          status_name: "Coping +60",
          date: "02/04/2022",
          program_status: "Coping +60",
          notes: "there are concerns",
        },
      ]);
    });
};
