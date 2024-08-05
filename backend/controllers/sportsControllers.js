const Student = require('../models/Sports/StudentSchema');
const Sport = require('../models/Sports/SportsSchema');
const Batch = require('../models/Sports/BatchSchema');

exports.createStudent2 = async (req, res) => {
    try {
        const { name, email, seatno, mobileno, memberid, programName, sport } = req.body;

        const existingEmailStudent = await Student.findOne({ "email": email });
    if (existingEmailStudent) {
      return res.status(400).send({ success: false, message: "This email is already used by another student." });
    }

    // Check if the student with the same memberid already exists
    const existingMemberIdStudent = await Student.findOne({ "memberid": memberid });
    if (existingMemberIdStudent) {
      return res.status(400).send({ success: false, message: "This member ID is already used by another student." });
    }

    // Check if the student with the same seatno already exists
    const existingSeatNoStudent = await Student.findOne({ "seatno": seatno });
    if (existingSeatNoStudent) {
      return res.status(400).send({ success: false, message: "This seat number is already used by another student." });
    }

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
        if (error.code === 11000) {
            res.status(400).send({ success: false, message: `This ${Object.keys(error.keyValue)} has already used to  fill the form.` })
        } else {
            res.status(400).send({ success: false, message: error.message })
        }
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

        let batchName;
        switch (programName) {
            case "Bachelor of Arts (Mass Communication & Journalism)":
                batchName = sportName + 3
                break;
            case "Bachelor of Business Administration":
                batchName = sportName + 2
                break;
            case "Bachelor of Business Management":
                batchName = sportName + 2
                break;
            case "Bachelor of Commerce (Accounting & Finance)":
                batchName = sportName + 3
                break;
            case "Bachelor of Commerce (Banking & Finance)":
                batchName = sportName + 3
                break;
            case "Bachelor of Commerce (Financial Markets)":
                batchName = sportName + 3
                break;
            case "Bachelor of Science (Psychology)":
                batchName = sportName + 3
                break;
            case "Bachelor of Computer Applications":
                batchName = sportName + 1
                break;
            case "Bachelor of Science (Computer Science)":
                batchName = sportName + 1
                break;
            case "Bachelor of Science (Economics)":
                batchName = sportName + 2
                break;
            case "Bachelor of Science (Information Technology)":
                batchName = sportName + 1
                break;
            case "Bachelor of Science (Biotechnology)":
                batchName = sportName + 3
                break;
            case "Bachelor of Science (Data Science)":
                batchName = sportName + 1
                break;
            case "Integrated Bachelor of Science-Master of Science":
                batchName = sportName + 3
                break;
            default:
                batchName = "default bench Name";
                break;
        }
        const queryString = batchName
        const batch = await Batch.findOne({ name: queryString });
        res.status(201).send({ remainingCapacity: batch.remainingCapacity });

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}


// exports.getStudentsFromSport = async (req, res) => {
//   const { sportName } = req.params;
//   try {
//     const sportObject = await Sport.findOne({ name: sportName }).sort(name).populate('batch');
//     if (!sportObject) {
//       return res.status(404).send({ message: 'Sport not found' });
//     }

//     const batches = await Batch.find({ _id: { $in: sportObject.batch } }).populate('students');

//     const students = batches.flatMap(batch => batch.students);

//     res.status(200).send(students);
//   } catch (err) {
//     res.status(400).send({ error: err.message });
//   }
// };

exports.getStudentsFromSport = async (req, res) => {
    const { sportName } = req.params;
    try {
        const sportObject = await Sport.findOne({ name: sportName }).populate('batch');
        if (!sportObject) {
            return res.status(404).send({ message: 'Sport not found' });
        }
        const batches = await Batch.find({ _id: { $in: sportObject.batch } }).populate('students');

        const batchWithStudents = batches.map(batch => ({
            batchName: batch.name,
            students: batch.students
        }));

        res.status(200).send(batchWithStudents);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}