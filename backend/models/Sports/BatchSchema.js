const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
    remainingCapacity: {
        type: Number,
        default: function () {
            return this.capacity;
        },
    },
    students: [{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }]
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model("Batch", BatchSchema);