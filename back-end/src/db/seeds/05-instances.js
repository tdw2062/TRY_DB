exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instances")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instances").insert([
        { start_date: "01-02-2019", discharge_date: "02-02-2020" },
        { start_date: "01-01-2020", discharge_date: "01-02-2021" },
      ]);
    });
};
