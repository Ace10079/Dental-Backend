// support.js Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const db = require('../Config/db');

const SupportSchema = new Schema(
    {
        ticket_no: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        details: { type: String, required: true },
        phone: { type: String, required: true },
        reply: { type: String },
        attachment: { type: String },
    },
    { timestamps: true }
);

const SupportModel = db.model('Support', SupportSchema);
module.exports = SupportModel;