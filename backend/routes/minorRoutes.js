const express = require("express");
const router = express.Router();

const { createStudent, getAllMinors, getAllPrograms } = require("../controllers/minorControllers");

router.get("/getMinor", getAllMinors);
router.get("/getProgram", getAllPrograms);
router.patch("/createStudent", createStudent);

module.exports = router;
