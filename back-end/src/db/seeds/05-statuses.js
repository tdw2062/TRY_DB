exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("statuses").insert([
        {
          instance_id: 1,
          status_name: "Had RC",
          date: "02/02/2022",
          program_status: "Coping Period",
          notes: "went well",
        },
        {
          instance_id: 1,
          status_name: "Off Coping Period",
          date: "02/03/2022",
          program_status: "Off Coping Period",
          notes: "everything fine",
        },
        {
          instance_id: 2,
          status_name: "Coping +60",
          date: "02/04/2022",
          program_status: "Coping +60",
          notes: "there are concerns",
        },
        {
          instance_id: 2,
          status_name: "Had RC",
          date: "02/06/2022",
          program_status: "Coping Period",
          notes: "needs follow up",
        },
      ]);
    });
};
