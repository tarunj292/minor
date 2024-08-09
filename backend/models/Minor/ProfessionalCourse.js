const mongoose = require("mongoose");

const ProfessionalCourse = new mongoose.Schema({
  profCourse: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Professional_Courses", ProfessionalCourse);