const MinorSchema = require("../models/MinorSchema");

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

// const getAllMinors = async (req, res) => {
//   try {
//     const minors = await MinorSchema.find()
//     res.send({data:minors});
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// const getAllMinors = async (req, res) => {
//   await MinorSchema.find({}).then((minors) => {
//     res.send({ data: minors });
//   }).catch((error) => {
//     res.status(500).send({ error: "Internal server error" });
//   });
// };