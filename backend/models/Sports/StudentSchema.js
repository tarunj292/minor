const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    seatno: {
        type: String,
        required: true,
        unique: true,
        maxlength: 11,
        minlength: 11
    },
    mobileno: {
        type: String,
        required: true,
    },
    memberid: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10
    },
    programName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Student", StudentSchema);