const MinorSchema = require("../models/MinorSchema");
const ProgramSchema = require("../models/ProgramSchema")

//working 
exports.createStudent = async (req, res) => {
  try {
    const { name, email, seatno, mobileno, memberid, programName, professionalcourse, language, minorSubject } = req.body;

    const minor = await MinorSchema.findOne({ courseName: minorSubject });
    if (!minor) {
      return res.status(404).send({ message: "Minor subject not found" });
    }
    const student = {
      name,
      email,
      seatno,
      mobileno,
      memberid,
      programName,
      professionalcourse,
      language,
    };
    minor.students.push(student);
    minor.remainingCapacity--;
    await minor.save();
    res.status(201).send({ message: "Student registered under minor subject" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//working
exports.getAllMinors = async (req, res) => {
  try {
    const minor = await MinorSchema.find()
    res.send({
      success: true,
      data: minor,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

exports.getOneMinor = async (req, res) => {
  try {
    const courseName = req.params.courseName;

    const Minor = await MinorSchema.findOne({ courseName: courseName })
    res.status(200).json(Minor)
  } catch (error) {
    console.log(error)
  }

};

//working
exports.getOneMinorByID = (req, res) => {
  MinorSchema.findById(req.params._id).then(response => {
    console.log("Hi ", response)
    res.send({
      response
    })
  }).catch(err => {
    res.send({
      success: false,
      error: err
    })
  })
}

//working
exports.getAllPrograms = async (req, res) => {
  try {
    const prgm = await ProgramSchema.find();
    res.send({
      success: true,
      data: prgm,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

//working
exports.getAllStudentsByMinor = async (req, res) => {
  try {
    const minorName = req.params.minorName;
    const minor = await MinorSchema.findOne({ courseName: minorName });
    if (!minor) {
      return res.status(404).send({ message: "Minor subject not found" });
    }
    res.send({
      success: true,
      data: minor.students,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};