//Seed the tables table
//Every time the seed file is run, delete the rows and  reset the autonumeric counter

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE participants RESTART IDENTITY CASCADE");

  return knex("participants").insert([
    {
      first_name: "Mike",
      last_name: "Jones",
      mobile_number: "330-867-8888",
    },
    {
      first_name: "Tim",
      last_name: "Clinton",
      mobile_number: "330-867-1101",
    },
    {
      first_name: "Jimmy",
      last_name: "Johns",
      mobile_number: "330-836-4444",
    },
  ]);
};
