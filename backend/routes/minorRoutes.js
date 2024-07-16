const express = require("express");
const router = express.Router();

const { createStudent, getAllMinors, getOneMinor, getOneMinorByID, getAllStudentByMinor, getAllPrograms } = require("../controllers/minorControllers");

router.get("/getMinor", getAllMinors);
router.get("/getOneMinorByID/:_id", getOneMinorByID)
router.get("/getOneMinor/:courseName", getOneMinor);
router.patch("/createStudent", createStudent);
router.get("/getProgram", getAllPrograms);
router.get("/getStudent/:_minorName", getAllStudentByMinor);

module.exports = router;