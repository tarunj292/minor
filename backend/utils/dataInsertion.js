const mongoose = require("mongoose");
const Minor = require("../models/MinorSchema");
const { programSchema } = require('../models/MinorSchema');
const program = mongoose.model('Program', programSchema);
const minordata = require("../dummydata/minordata.json");
const programdata=require("../dummydata/programdata.json");

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

const progrmdt = async () => {
  try {
    await program.create(programdata);
    console.log("Data imported");
    console.log("Program Data Updated");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
progrmdt();