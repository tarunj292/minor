const Student = require('../models/StudentSchema');
const Sport = require('../models/SportsSchema');
const Batch = require('../models/BatchSchema');

exports.createStudent2 = async (req, res) => {
    try {
        const { name, email, seatno, mobileno, memberid, programName, sport } = req.body;

        const student = await Student.create({ name, email, seatno, mobileno, memberid, programName });

        if (!student) {
            return res.status(404).send({ success: false, message: "Student Not Created" });
        }
        let batchName;
        switch (programName) {
            case "Bachelor of Arts (Mass Communication & Journalism)":
                batchName = sport + 3
                break;
            case "Bachelor of Business Administration":
                batchName = sport + 2
                break;
            case "Bachelor of Business Management":
                batchName = sport + 2
                break;
            case "Bachelor of Commerce (Accounting & Finance)":
                batchName = sport + 3
                break;
            case "Bachelor of Commerce (Banking & Finance)":
                batchName = sport + 3
                break;
            case "Bachelor of Commerce (Financial Markets)":
                batchName = sport + 3
                break;
            case "Bachelor of Science (Psychology)":
                batchName = sport + 3
                break;
            case "Bachelor of Computer Applications":
                batchName = sport + 1
                break;
            case "Bachelor of Science (Computer Science)":
                batchName = sport + 1
                break;
            case "Bachelor of Science (Economics)":
                batchName = sport + 2
                break;
            case "Bachelor of Science (Information Technology)":
                batchName = sport + 1
                break;
            case "Bachelor of Science (Biotechnology)":
                batchName = sport + 3
                break;
            case "Bachelor of Science (Data Science)":
                batchName = sport + 1
                break;
            case "Integrated Bachelor of Science-Master of Science":
                batchName = sport + 3
                break;
            default:
                batchName("Unknown program");
                break;
        }

        const batch = await Batch.findOneAndUpdate(
            { name: batchName },
            {
                $push: { students: student._id },
                $inc: { remainingCapacity: -1 }
            },
            { new: true, useFindAndModify: false }
        );
        if (batch) {
            const sports = await Sport.findOneAndUpdate(
                { name: sport, remainingCapacity: { $gt: 0 } },
                {
                    $addToSet: { batch: batch._id },
                    $inc: { remainingCapacity: -1 }
                },
                { new: true, useFindAndModify: false }
            )

            if (sports) {
                res.status(201).send({ success: true, message: "Student Created", student, batch, sports });
            } else {
                res.send("Batch updated, but sport not found.");
            }
        } else {
            res.status(400).send({ success: false, message: "Student Created, batch not found", student, batch });
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};

exports.getAllSports = async (req, res) => {
    try {
        const sports = await Sport.find({});
        res.status(201).send({ sports });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};

exports.getCapacityBySport = async (req, res) => {
    try {
        const sportName = req.params.sportName
        const programName = req.params.programName
        const batchNumber = 1
        const queryString = sportName + batchNumber
        const batch = await Batch.findOne({ name: queryString });
        res.status(201).send({ remainingCapacity: batch.remainingCapacity });

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}