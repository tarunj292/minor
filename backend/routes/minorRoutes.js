const express = require("express");
const router = express.Router();

const{createStudent,getAllMinors}=require("../controllers/minorControllers");

router.get("/getMinor", getAllMinors);
router.patch("/createStudent",createStudent);

module.exports = router;
