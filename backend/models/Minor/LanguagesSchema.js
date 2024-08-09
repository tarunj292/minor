const mongoose = require("mongoose");

const LanguagesSchema = new mongoose.Schema({
  langCourseList: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Languages", LanguagesSchema);