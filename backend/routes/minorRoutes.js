const express = require("express");
const router = express.Router();

const { createStudent, getAllMinors, getAllStudentByMinor,getAllPrograms } = require("../controllers/minorControllers");

router.get("/getMinor", getAllMinors);
router.get("/getProgram", getAllPrograms);
router.patch("/createStudent", createStudent);
router.get("/getStudent/:_minorName",getAllStudentByMinor);

module.exports = router;
