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
  remainingCapacity:{
    type: Number,
    default:capacity
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
      },
      seatno: {
        type: String,
        required: true,
      },
    },
  ],
});

const ParentSchema = new mongoose.Schema({
  minorsubjects: [MinorSubjectSchema],
});

const MinorSchema = mongoose.model("Parent", ParentSchema);

module.exports = MinorSchema;


// const mongoose = require("mongoose");

// const StudentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   rollno: {
//     type: String,
//     required: true,
//   },
// });

// const MinorSubjectSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   capacity: {
//     type: Number,
//     required: true,
//   },
//   students: [StudentSchema], // Embed the StudentSchema within the MinorSubjectSchema
// });

// const ParentSchema = new mongoose.Schema({
//   minorsubjects: [MinorSubjectSchema],
// });

// const MinorSchema = mongoose.model("Minor", ParentSchema); // Corrected the model name to "Minor"
// module.exports = MinorSchema;


// const mongoose = require("mongoose");

// const StudentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   rollno: {
//     type: String,
//     required: true,
//   },
// });

// const MinorSubjectSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   capacity: {
//     type: Number,
//     required: true,
//   },
//   students: [StudentSchema], // Embed the StudentSchema within the MinorSubjectSchema
//   remainingSeats: {
//     type: Number,
//     default: function () {
//       return this.capacity - this.students.length;
//     },
//   },
// });

// const ParentSchema = new mongoose.Schema({
//   minorsubjects: [MinorSubjectSchema],
// });

// const MinorSchema = mongoose.model("Minor", ParentSchema);
// module.exports = MinorSchema;
