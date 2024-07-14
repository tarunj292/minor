// const Minor = require("../models/MinorSchema");
// //make action and send entire database to frontend
// // Get all minors
// const getAllMinors = async (req, res) => {
//   try {
//     const minors = await Minor.find();
//     res.json(minors);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// // Update a minor
// // const updateMinor = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { name, capacity } = req.body;
// //     const updatedMinor = await Minor.findByIdAndUpdate(
// //       id,
// //       { name, capacity },
// //       { new: true }
// //     );
// //     res.json(updatedMinor);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// // // Delete a minor
// // const deleteMinor = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     await Minor.findByIdAndDelete(id);
// //     res.json({ message: 'Minor deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// //add a controller that deletes data but not the subjects

// module.exports = {
//   getAllMinors,
//   createMinor,
//   //updateMinor,
//   //deleteMinor,
// };
