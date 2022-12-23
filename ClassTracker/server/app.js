import express from "express";
import { google } from "googleapis";

import ChartsRouter from "./controllers/charts/index.js";
import ApiRouter from "./controllers/api/index.js";
const app = express();

// middleware to parse the body of the request to JSON format
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello ClassTracker is Live!");
  res.status(200).json({ message: "Hello World" });
});

app.use("/charts", ChartsRouter);

app.use("/api", ApiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
