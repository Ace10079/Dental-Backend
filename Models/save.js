// models/Patient.js

const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaveSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
  
    image: {
        type: String, // filename for multer
        required: true
    }
}, { timestamps: true });

const SaveModel = db.model('Save', SaveSchema);
module.exports = SaveModel;
