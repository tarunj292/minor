const mongoose = require("mongoose");
const Minor = require("../models/MinorSchema");
const minordata = require("../dummydata/minordata.json");
const fs = require("fs");

require("dotenv").config({
  path: "../.env",
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database Connection Error: ", err);
  });

// Insert the dummy data into the database
const insertMany = async () => {
  try {
    await Minor.create(minordata);
    console.log("Data imported");
    console.log("Minor Data Updated");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
insertMany();

