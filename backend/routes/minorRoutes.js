const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const { createStudent, getAllMinors, getOneMinor, getOneMinorByID, getAllStudentsByMinor, getAllPrograms } = require("../controllers/minorControllers");
=======
const { createStudent, getAllMinors, getOneMinor, getOneMinorByID, getAllStudentByMinor, getAllPrograms } = require("../controllers/minorControllers");
>>>>>>> cd74ffd63b1eec0ce6268aaf66f79f98eddd30e9

router.get("/getMinor", getAllMinors);
router.get("/getOneMinorByID/:_id", getOneMinorByID)
router.get("/getOneMinor/:courseName", getOneMinor);
router.patch("/createStudent", createStudent);
router.get("/getProgram", getAllPrograms);
<<<<<<< HEAD
router.get("/getStudent/:minorName", getAllStudentsByMinor);
=======
router.get("/getStudent/:_minorName", getAllStudentByMinor);
>>>>>>> cd74ffd63b1eec0ce6268aaf66f79f98eddd30e9

module.exports = router;