const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    dentist_id: {
        type: String,
        required: true,
        
    },
    img: {
        type: String, // filename for multer
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ProfileModel = db.model('Profile', ProfileSchema);
module.exports = ProfileModel;
