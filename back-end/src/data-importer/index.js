const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const knex = require("../db/connection");

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
async function listMajors(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1SoWGEcPaxCBSrHFIrUF52LYQlqdst37oAnzDlVnEbO4",
    range: "Entered Program!A2:CT",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  console.log("Name, Major:");
  let objArray = [];

  const headingsArray = [
    "last_name",
    "first_name",
    "mi",
    "incident_num",
    "birth_date",
    "age",
    "gender",
    "race",
    "currently_in_program",
    "phone",
    "sex_offender",
    "tanf",
    "times_incarcerated",
    "years_inside",
    "recent_stay_length",
    "charges",
    "drug_of_choice",
    "second_drug_of_choice",
    "last_use_date",
    "po_name",
    "income_before_try",
    "mat_entering_try",
    "home_county",
    "uci_num",
    "adm_fund",
    "adm_start_date",
    "adm_90",
    "adm_180",
    "last_adm_date",
    "adm_discharge",
    "adm_days",
    "rec_treatment_update",
    "latest_tu_date",
    "tu_status_adm",
    "start_date",
    "coping_period_length",
    "earliest_coping_release_date",
    "off_coping_date",
    "proj_coping60_end_date",
    "off_coping60_date",
    "needs_ged",
    "ged_start_date",
    "ged_end_date",
    "job_search_start_date",
    "leadership_dev_start_date",
    "employment_start_date",
    "employment_details",
    "on_restrictions_date",
    "restrictions_description",
    "off_restrictions_date",
    "program_status",
    "got_id",
    "got_birth_certificate",
    "got_ss_card",
    "accounts_before_try",
    "got_checking",
    "got_savings",
    "got_temps",
    "got_license",
    "started_mat_date",
    "had_court_date",
    "met_with_po",
    "had_ind_counseling",
    "iop_start_date",
    "iop_12_week_date",
    "iop_end_date",
    "aftercare_start_date",
    "aftercare_8week_date",
    "aftercare_end_date",
    "had_counseling",
    "days_since_rc",
    "had_ld_meeting",
    "financial_counseling_meeting",
    "drug_test_date",
    "relapse_date",
    "discharge_date",
    "housing_transition",
    "status_at_discharge",
    "days_in_program",
    "discharge_reason",
    "last_county",
    "deceased",
    "next_check_date",
    "1_YR_Fed",
    "1_YR_State",
    "2_YR_Fed",
    "2_YR_State",
    "3_YR_Fed",
    "3_YR_State",
    "4_YR_Fed",
    "4_YR_State",
    "5_YR_Fed",
    "5_YR_State",
    "new_arrest_date",
    "new_conviction_date",
    "new_state_lockup_date",
    "program_utilization",
    "returned_to_prison",
  ];

  const notUsedArray = [
    "mi",
    "age",
    "race",
    "phone",
    "second_drug_of_choice",
    "po_name",
    "uci_num",
    "adm_fund",
    "adm_start_date",
    "adm_90",
    "adm_180",
    "last_adm_date",
    "adm_discharge",
    "adm_days",
    "latest_tu_date",
    "tu_status_adm",
    "earliest_coping_release_date",
    "proj_coping60_end_date",
    "restrictions_description",
    "program_status",
    "got_id",
    "got_ss_card",
    "got_temps",
    "got_birth_certificate",
    "had_court_date",
    "met_with_po",
    "had_ind_counseling",
    "iop_12_week_date",
    "aftercare_8week_date",
    "days_since_rc",
    "had_ld_meeting",
    "financial_counseling_meeting",
    "days_in_program",
    "last_county",
    "deceased",
    "new_arrest_date",
    "new_conviction_date",
    "new_state_lockup_date",
    "returned_to_prison",
    "times_incarcerated",
  ];

  rows.forEach((row) => {
    const instanceObj = {};

    for (let i = 0; i < headingsArray.length; i++) {
      if (row[i]) {
        instanceObj[headingsArray[i]] = row[i];
      } else {
        instanceObj[headingsArray[i]] = "";
      }
    }
    objArray.push(instanceObj);
  });

  console.log(objArray);

  /*
  const jsonArray = JSON.stringify(objArray);

  fs.writeFile("./instances.json", jsonArray, "utf-8", (err) => {
    if (err) {
      return console.log(err);
    }
  });
  */
}

authorize().then(listMajors).catch(console.error);
