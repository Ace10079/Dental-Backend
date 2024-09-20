const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrialSchema = new Schema({
    dentist_id: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    // Any other fields you need can be added here
}, { timestamps: true });

const TrialModel = db.model('Trial', TrialSchema);
module.exports = TrialModel;
