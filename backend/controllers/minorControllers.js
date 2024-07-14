const MinorSchema = require("../models/MinorSchema");

const createStudent = async (req, res) => {
  try {
    const { name, email, seatno,mobileno,memberid,programName,professionalcourse,language, minorSubject } = req.body;
    const minor = await MinorSchema.findOne({ courseName: minorSubject });
    if (!minor) {
      return res.status(404).json({ message: "Minor subject not found" });
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
    await minor.save();
    res.status(201).json({ message: "Student registered under minor subject" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllMinors = async (req, res) => {
  try {
    const minors = await Minor.find();
    res.json(minors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports={
  createStudent,getAllMinors
}