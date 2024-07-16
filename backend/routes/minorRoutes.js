const express = require("express");
const router = express.Router();

const { createStudent, getAllMinors, getOneMinor, getOneMinorByID, getAllStudentsByMinor, getAllMinorByProgram } = require("../controllers/minorControllers");

router.get("/getMinor", getAllMinors);
router.get("/getOneMinorByID/:_id", getOneMinorByID)
router.get("/getOneMinor/:courseName", getOneMinor);
router.patch("/createStudent", createStudent);
router.get("/getAllMinorByProgram/:progName", getAllMinorByProgram);
router.get("/getStudent/:minorName", getAllStudentsByMinor);

module.exports = router;