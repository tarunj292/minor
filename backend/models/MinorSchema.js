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
      mobileno: {
        type: Number,
        required: true, 
      },
      memberid: {
        type: String,
        required: true,
      },
      programName:{
        type:String,
        required:true
      },
      professionalcourse: {
        type:String,
        required:true
      },
      Language: {
        type: {
          type: String,
          required:true
        },
      },
    },
  ],
});

MinorSubjectSchema.virtual("remainingCapacity").get(function () {
  return this.capacity - this.students.length;
});


const ProgramSchema=new mongoose.Schema({
    programname:{
      type:String,
      required:true,
      minors:{
        type:[{type:String}],
      }
    }
});

module.exports=mongoose.model("Program",ProgramSchema);
module.exports = mongoose.model("Minor", MinorSubjectSchema);;

// const programName=new mongoose.Schema(
//   {
//     name: {
//   }
//   minor:[]
// });

//program name:"ABC"
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
