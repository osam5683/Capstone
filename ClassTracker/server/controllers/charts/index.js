import express from "express";
import { google } from "googleapis";

import verifyToken from "../../middlewares/auth/verifyToken.js";

const router = express.Router();
// Get route to get total average marks of all students , weekly total marks of each student , names of the student
router.get("/all", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fpdpBadWH1U7QIz7TnQJssKhLls0XKFFr2BmMHMa8Ds"; // id of the spreadsheet
  const weeks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  const bigData = weeks.map(async (e, index) => {
    index = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `Sheet${e}!G2:G40`, // range of the spreadsheet
    });
    return index.data.values;
  });
  let resolvedData = await Promise.all(bigData);
  let resolvedDataAverage = resolvedData.map((e) => {
    return e.flat(1);
  });
  let averageMarksClass = resolvedDataAverage.map((e) => {
    return (
      e.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      }, 0) / e.length
    );
  });

  let resolvedDataWeeklyAverage = resolvedData;
  let weeklyData = resolvedDataWeeklyAverage.map((e) => {
    return e.map((row) => {
      return row[0];
    });
  });

  // create an array containing 39 arrays with 13 elements each
  let userTotalWeekly = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  for (let i = 0; i < 39; i++) {
    userTotalWeekly[i] = weeklyData.map((e) => {
      return e[i];
    });
  }
  let names = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `Sheet1!A2:A40`, // range of the spreadsheet
  });
  names = names.data.values;
  names = names.flat(2);

  let totalForEachStudent = userTotalWeekly.map((e) => {
    return e.reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);
  });
  // add student name to his total marks
  let leaderboard = totalForEachStudent.map((e, index) => {
    return [names[index], e];
  });
  // sort the array in descending order
  leaderboard.sort((a, b) => {
    return b.total - a.total;
  });

  res
    .status(200)
    .json({ averageMarksClass, userTotalWeekly, names, leaderboard });
});

// GET route to get the total marks of the selected student per week in admin dashboard.
router.get("/students/:student", async (req, res) => {
  const student = req.params.student;
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fpdpBadWH1U7QIz7TnQJssKhLls0XKFFr2BmMHMa8Ds";
  const weeks = [
    "Sheet1",
    "Sheet2",
    "Sheet3",
    "Sheet4",
    "Sheet5",
    "Sheet6",
    "Sheet7",
    "Sheet8",
    "Sheet9",
    "Sheet10",
    "Sheet11",
    "Sheet12",
    "Sheet13",
  ];
  const bigData = weeks.map(async (e, index) => {
    index = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      majorDimension: "COLUMNS",
      range: `${e}!A2:G40`,
    });
    return index.data.values;
  });
  let resolvedData = await Promise.all(bigData);
  let students = resolvedData[0][0];
  resolvedData = resolvedData.map((e) => {
    return e[6];
  });

  let studentIndex = students.indexOf(student);
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  let studentMarks = resolvedData.map((e) => {
    return e[studentIndex];
  });
  res.status(200).json({ studentMarks });
});

// GET route for creating Leaderboard in public and admin dashboard.
router.get("/leaderboard", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fpdpBadWH1U7QIz7TnQJssKhLls0XKFFr2BmMHMa8Ds"; // id of the spreadsheet
  const weeks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  const bigData = weeks.map(async (e, index) => {
    index = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `Sheet${e}!A2:G40`, // range of the spreadsheet
    });
    return index.data.values;
  });
  let data = await Promise.all(bigData);
  // first lets get total for each student for all weeks
  let resolvedData = data.map((e) => {
    return e
      .map((row) => {
        return [row[6]];
      })
      .flat(1);
  });
  // conver to numbers
  resolvedData = resolvedData.map((e) => {
    return e.map((row) => {
      return parseInt(row);
    });
  });
  resolvedData = resolvedData.reduce((a, b) => {
    return a.map((e, i) => {
      return e + b[i];
    });
  });
  // now lets get the names
  let names = data[0].map((e) => {
    return e[0];
  });
  // now lets combine the two
  let leaderboard = names.map((e, i) => {
    return [e, resolvedData[i]];
  });
  // sort the array
  leaderboard = leaderboard.sort((a, b) => {
    return b[1] - a[1];
  });
  res.status(200).json({ leaderboard });
});

export default router;
