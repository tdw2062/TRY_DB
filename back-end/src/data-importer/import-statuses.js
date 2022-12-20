const fs = require("fs").promises;
const nf = require("fs");
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const knex = require("../db/connection");
const revisedParticipants = require("./participants.json");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1SoWGEcPaxCBSrHFIrUF52LYQlqdst37oAnzDlVnEbO4/edit#gid=681108900
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listStatuses(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1SoWGEcPaxCBSrHFIrUF52LYQlqdst37oAnzDlVnEbO4",
    range: "Statuses!C3:G",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  //Create headingsArray
  const headingsArray = [
    "name",
    "incident_num",
    "date",
    "status_name",
    "notes",
  ];

  //Create array to store the statuses
  let statusesArray = [];

  //Loop through the records and create a status object with each record
  //Then store the status object in the statusesArray
  rows.forEach((row) => {
    const statusObj = {};

    for (let i = 0; i < headingsArray.length; i++) {
      if (row[i]) {
        statusObj[headingsArray[i]] = row[i];
      } else {
        statusObj[headingsArray[i]] = "";
      }
    }
    statusesArray.push(statusObj);
  });

  console.log(statusesArray);

  //Bring in the participants and log the data to the console
  //Go through the participants array and create a full_name key
  for (let participant of revisedParticipants) {
    participant.full_name =
      participant.first_name + " " + participant.last_name;
  }
  console.log("participants", revisedParticipants);

  //Loop through statusesArray and assign each status a participantId, first_name, last_name
  for (let status of statusesArray) {
    const locatedParticipant = revisedParticipants.find(
      ({ full_name }) => full_name === status.name
    );
    if (locatedParticipant) {
      status.first_name = locatedParticipant.first_name;
      status.last_name = locatedParticipant.last_name;
      status.participant_id = locatedParticipant.participant_id;
    }
  }

  console.log("updated status array", statusesArray);
}

authorize().then(listStatuses).catch(console.error);
