const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    customer_id: String,
    customer_name: String,
    status: String,
    transaction_id: String,
    transaction_status: String,
    dentist_id: String, 
    expiry_date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const SubscriptionModel = db.model('Subscription', SubscriptionSchema);
module.exports = SubscriptionModel;
