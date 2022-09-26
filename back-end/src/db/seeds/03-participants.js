//Seed the tables table
//Every time the seed file is run, delete the rows and  reset the autonumeric counter

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE participants RESTART IDENTITY CASCADE");

  return knex("participants").insert([
    {
      first_name: "Mike",
      last_name: "Jones",
      dob: "02/02/1981",
    },
    {
      first_name: "Tim",
      last_name: "Clinton",
      dob: "06/02/1984",
    },
    {
      first_name: "Jimmy",
      last_name: "Johns",
      dob: "03/07/1987",
    },
  ]);
};
