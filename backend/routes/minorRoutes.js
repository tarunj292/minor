const express = require("express");
const router = express.Router();

const { createStudent, getAllMinors, getOneMinor, getOneMinorByID, getAllStudentsByMinor, getAllMinorByProgram, getAllPrograms, getAllLanguages,
    getAllProfessionalCourses
 } = require("../controllers/minorControllers");

router.get("/getAllPrograms", getAllPrograms)
router.get("/getMinor", getAllMinors);
router.get("/getOneMinorByID/:_id", getOneMinorByID)
router.get("/getOneMinor/:courseName", getOneMinor);
router.patch("/createStudent", createStudent);
router.get("/getAllMinorByProgram/:progName", getAllMinorByProgram);
router.get("/getStudent/:minorName", getAllStudentsByMinor);
router.get("/getAllLanguages",getAllLanguages);
router.get("/getAllProfessionalCourses",getAllProfessionalCourses);

module.exports = router;