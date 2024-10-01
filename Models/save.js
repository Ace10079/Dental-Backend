// models/Patient.js

const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaveSchema = new Schema({
  
    patient_name: {
        type: String,
        required: true
    },
    patient_id:{
        type:String
    },
    tooth_number: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    image: {
        type: String, // filename for multer
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    dentist_id: {
        type: String
    },
    class1: {
        type: String
    },
    probability1: {
        type: String
    },
    class2: {
        type: String
    },
    probability2: {
        type: String
    },
    class3: {
        type: String
    },
    probability3: {
        type: String
    }
}, { timestamps: true });

const SaveModel = db.model('Save', SaveSchema);
module.exports = SaveModel;
