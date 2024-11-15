const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../Config/db');
const FeedbackSchema = new Schema({
    response: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const FeedbackModel = db.model('Feedback', FeedbackSchema);
module.exports = FeedbackModel;
