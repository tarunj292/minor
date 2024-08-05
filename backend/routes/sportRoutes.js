const express = require("express");
const router = express.Router();

const { createStudent2, getAllSports, getCapacityBySport,
    getStudentsFromSport
 } = require('../controllers/sportsControllers')

router.post('/createStudent2', createStudent2);
router.get('/getAllSports', getAllSports);
router.get('/getCapacityBySport/:programName/:sportName', getCapacityBySport);
router.get('/getStudentsFromSport/:sportName',getStudentsFromSport)
module.exports = router;