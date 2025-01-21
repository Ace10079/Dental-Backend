const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../Config/db');

// Package Schema
const PackageSchema = new Schema(
    {
        package_no: { type: String, unique: true, required: true },
        package_name: { type: String, required: true },
        mrp: { type: Number, required: true },
        offer: { type: Number, required: true },
        features: { type: [String], required: true },
        duration: { type: Number, required: true }, // Duration in months or days
        expiry: { type: Date, required: true },
    },
    { timestamps: true }
);

const PackageModel = db.model('Package', PackageSchema);
module.exports = PackageModel;