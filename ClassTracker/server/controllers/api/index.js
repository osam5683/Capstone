import express from "express";
import { google } from "googleapis";

import bcrypt from "bcrypt";
import {
  loginValidation,
  errorMiddleware,
} from "../../middlewares/validation/index.js";
import Student from "../../models/Student/index.js";
import Admin from "../../models/Admin/index.js";
import generateToken from "../../middlewares/auth/generateToken.js";
import verifyToken from "../../middlewares/auth/verifyToken.js";

import cookieParser from "cookie-parser";

import "../../dbConnect.js";
const router = express.Router();

router.use(cookieParser());

//  route for all data
router.get("/sheets/all", async (req, res) => {
  console.log(req.payload);
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json", // path to the secrets.json file that contains the credentials
    scopes: "https://www.googleapis.com/auth/spreadsheets", // scope of the credentials
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fpdpBadWH1U7QIz7TnQJssKhLls0XKFFr2BmMHMa8Ds"; // id of the spreadsheet
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
      range: `${e}!A2:G40`, // range of the spreadsheet
    });
    return index.data.values;
  });
  const resolvedData = await Promise.all(bigData);
  // const foramatedData = resolvedData.map((e) => {
  //   return e.map((row) => {
  //     return {
  //       studentName: row[0],
  //       assignment1: row[1],
  //       assignment2: row[2],
  //       bonus: row[3],
  //       blog: row[4],
  //       attendance: row[5],
  //       total: row[6],
  //     };
  //   });
  // });
  // names of the students
  let names = resolvedData[0].map((e) => {
    return e[0];
  });

  let totalWeeklyData = resolvedData.map((e) => {
    return e.map((e) => {
      return e[6];
    });
  });
  // for average total of each week
  let totalWeeklyDataSum = totalWeeklyData.map((e) => {
    return (
      e.reduce((a, b) => {
        return Number(a) + Number(b);
      }) / 39
    );
  });
  //  user Weekly total marks
  let userWeeklyData = [];
  for (let i = 0; i < 39; i++) {
    userWeeklyData[i] = totalWeeklyData.map((e) => e[i]);
  }
  // for leaderboard
  let leaderboard = userWeeklyData
    .map((e, index) => {
      return [
        e.reduce((a, b) => {
          return Number(a) + Number(b);
        }),
        names[index],
      ];
    })
    .sort((a, b) => b[0] - a[0]);

  let studentAllData = [];
  for (let i = 0; i < 39; i++) {
    studentAllData[i] = resolvedData.map((e) => e[i]);
  }
  studentAllData = studentAllData.map((e) => {
    return e.map((e) => {
      return [e[1], e[2], e[3], e[4], e[5]];
    });
  });

  res.status(200).json({
    names,
    leaderboard,
    userWeeklyData,
    totalWeeklyDataSum,
    studentAllData,
  });
});
// GET data from sheet for specific week
router.get("/sheets/:week", async (req, res) => {
  const { week } = req.params;
  // create google auth function
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json", // path to the secrets.json file that contains the credentials
    scopes: "https://www.googleapis.com/auth/spreadsheets", // scope of the credentials
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fpdpBadWH1U7QIz7TnQJssKhLls0XKFFr2BmMHMa8Ds"; // id of the spreadsheet
  const data = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `Sheet${week}!A2:G40`, // range of the spreadsheet
  });
  const formattedData = data.data.values.map((row) => {
    return {
      studentName: row[0],
      assignment1: row[1],
      assignment2: row[2],
      bonus: row[3],
      blog: row[4],
      attendance: row[5],
      total: row[6],
    };
  });
  res.status(200).json({ data: formattedData });
});

//  login route for student and admin
router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let user = await Student.findOne({ email });
    let admin = await Admin.findOne({ email });
    if (!user && admin) {
      user = admin;
    }
    if (!user && !admin) {
      return res.status(404).json({ error: "User Not Found" });
    }
    let matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Passwords don't match" });
    }
    let payload = {
      name: user.name,
      role: user.role,
    };
    // let dRole = user.role;
    // let name = user.name;
    let token = generateToken(payload);
    res.cookie("auth-token", token, {
      httpOnly: true, // This is used to make the cookie accessible to the client side.
      expires: new Date(Date.now() + 86400000 * 15), // 15 days
    });
    res.cookie("verified", true, {
      httpOnly: false,
      expires: new Date(Date.now() + 86400000 * 15), // 15 days
    });
    res.status(200).json({ success: "Successfully logged in!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//  logout route for student and admin
router.post("/logout", async (req, res) => {
  try {
    console.log("logout");
    res.clearCookie("auth-token");
    res.cookie("verified", "false", {
      httpOnly: false,
    });
    res.status(200).json({ success: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//  auth route for student and admin
router.get("/verify", verifyToken, async (req, res) => {
  try {
    let role = req.payLoad.role;
    let name = req.payLoad.name;
    res.status(200).json({ success: "Verified", role, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
