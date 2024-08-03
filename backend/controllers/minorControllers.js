const MinorSchema = require("../models/Minor/MinorSchema");
const ProgramSchema = require("../models/Minor/ProgramSchema")
const ProfessionalCourse = require("../models/Minor/ProfessionalCourse")
const LanguagesSchema = require("../models/Minor/LanguagesSchema");

exports.createStudent = async (req, res) => {
  try {
    const { name, email, seatno, mobileno, memberid, programName, professionalcourse, language, minorSubject } = req.body;

    const existingEmailStudent = await MinorSchema.findOne({ "students.email": email });
    if (existingEmailStudent) {
      return res.status(400).send({ success: false, message: "This email is already used by another student." });
    }

    // Check if the student with the same memberid already exists
    const existingMemberIdStudent = await MinorSchema.findOne({ "students.memberid": memberid });
    if (existingMemberIdStudent) {
      return res.status(400).send({ success: false, message: "This member ID is already used by another student." });
    }

    // Check if the student with the same seatno already exists
    const existingSeatNoStudent = await MinorSchema.findOne({ "students.seatno": seatno });
    if (existingSeatNoStudent) {
      return res.status(400).send({ success: false, message: "This seat number is already used by another student." });
    }

    const minor = await MinorSchema.findOne({ courseName: minorSubject });

    if (!minor) {
      return res.status(404).send({ success: false, message: "Minor subject not found" });
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
    res.status(201).send({ success: true, message: "Student registered under minor subject" });

  } catch (error) {
    res.status(400).send({ success: true, message: error.message });
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

exports.getAllPrograms = async (req, res) => {
  try {
    const Programs = await ProgramSchema.find()
    res.send({
      success: true,
      data: Programs,
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

exports.getOneMinorByID = (req, res) => {
  MinorSchema.findById(req.params._id).then(response => {
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

exports.getAllMinorByProgram = async (req, res) => {
  try {
    const progName = req.params.progName
    const Minors = await ProgramSchema.findOne({ progName: progName });
    res.status(200).json(Minors)
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

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


exports.getAllLanguages = async (req, res) => {
  try {
    const Language = await LanguagesSchema.find()
    res.send({
      success: true,
      data: Language,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

exports.getAllProfessionalCourses = async (req, res) => {
  try {
    const profCourse = await ProfessionalCourse.find()
    res.send({
      success: true,
      data: profCourse,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

exports.getAllStudentsByCategories = async (req, res) => {
  try {
    const { professionalcourse, language } = req.query;

    if (!professionalcourse && !language) {
      return res.status(400).json({ message: "Please provide a professional course or language to filter by." });
    }

    const filter = {};

    if (professionalcourse) {
      filter['students.professionalcourse'] = professionalcourse;
    }

    if (language) {
      filter['students.language'] = language;
    }

    const minors = await MinorSchema.find(filter);

    const students = minors.reduce((acc, minor) => {
      const filteredStudents = minor.students.filter(student => {
        if (professionalcourse && language) {
          return student.professionalcourse === professionalcourse && student.language === language;
        } else if (professionalcourse) {
          return student.professionalcourse === professionalcourse;
        } else if (language) {
          return student.language === language;
        }
      });
      return [...acc, ...filteredStudents];
    }, []);

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
