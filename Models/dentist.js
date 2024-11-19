const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../Config/db');
const DentistSchema = new Schema(
    {
        dentist_id: String,
        dentist_reg_number: String,
        dentist_name: String,
        phone: { type: String, unique: true, required: true }, // Ensures unique phone numbers
        email: { type: String, unique: true, required: true }, // Ensures unique emails
        password: { type: String, required: true },
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

// Hash the password before saving the dentist
DentistSchema.pre('save', async function(next) {
    const dentist = this;
    if (!dentist.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(dentist.password, 10);
        dentist.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to create a password reset token
DentistSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
};

const DentistModel = db.model('Dentist', DentistSchema);
module.exports = DentistModel;
