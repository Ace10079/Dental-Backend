const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const DentistSchema = new Schema({
    dentist_id: String,
    dentist_name: String,
    phone: String,
    email: String,
    password: { type: String, required: true }
}, { timestamps: true });

DentistSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    next();
});

const DentistModel = db.model('Dentist', DentistSchema);
module.exports = DentistModel;
