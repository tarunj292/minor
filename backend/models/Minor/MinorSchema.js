const mongoose = require("mongoose");

const MinorSubjectSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  remainingCapacity: {
    type: Number,
    default: function () {
      return this.capacity;
    },
  },
  students: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique : true 
      },
      seatno: {
        type: String,
        required: true,
        unique : true 
      },
      mobileno: {
        type: String,
        required: true,
      },
      memberid: {
        type: String,
        required: true,
        unique : true 

      },
      programName: {
        type: String,
        required: true,
      },
      professionalcourse: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Minor", MinorSubjectSchema);