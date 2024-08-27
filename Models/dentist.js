const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DentistSchema = new Schema({
    dentist_id: String,
    dentist_name: String,
    phone: String,
    email: String
}, { timestamps: true });

const DentistModel = db.model('Dentist', DentistSchema);
module.exports = DentistModel;
