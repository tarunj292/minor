const mongoose = require("mongoose");
const Sport = require('../models/Sports/SportsSchema');
const Batch = require('../models/Sports/BatchSchema');
const sportData = require("../dummydata/sports.json");
const batchData = require("../dummydata/batch.json");


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

const insertBatchMany = async () => {
    try {
        await Batch.create(batchData);
        console.log("Data imported");
        console.log("Batch Data Updated");
    } catch (err) {
        console.log(err);
    }
};
insertBatchMany();

// Insert the dummy data into the database
const insertMany = async () => {
    try {
        await Sport.create(sportData);
        console.log("Data imported");
        console.log("Sport Data Updated");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};
insertMany();