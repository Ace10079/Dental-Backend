const db = require('../Config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    admin_id: String,
    admin_name: String,
    email: String,
    password: String,
}, { timestamps: true });

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const AdminModel = db.model('Admin', AdminSchema);
module.exports = AdminModel;
