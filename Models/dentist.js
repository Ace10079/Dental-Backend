const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const DentistSchema = new Schema({
    dentist_id: String,
    dentist_reg_number:String,
    dentist_name: String,
    phone: String,
    email: String,
    password: { type: String, required: true }
}, { timestamps: true });

DentistSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

const DentistModel = db.model('Dentist', DentistSchema);
module.exports = DentistModel;
