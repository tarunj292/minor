const mongoose = require("mongoose");

const SportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    batch: [{
        type: mongoose.Types.ObjectId,
        ref: 'Batch'
    }],
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
});

module.exports = mongoose.model("Sport", SportSchema);