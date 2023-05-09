const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");
const Test = require("./models/Test");
const { run, submit } = require("./services/NodeMailerService");

config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Customer onboarding service running");
});

app.post("/sendMail", async (req, res) => {
  await run();
  res.json({});
});

app.post("/submit", async (req, res) => {
  await submit(req.body);
  res.json({});
});

app.post("/add", async (req, res) => {
  const newTest = new Test({
    test: req.body.test,
  });
  const createdTest = await newTest.save();
  res.json(createdTest);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// mongoose.connect(process.env.MONGO_URL).then(() => {

// });
