const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReplySchema = new mongoose.Schema({
    ticket_no: { type: String, required: true },
    reply: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});
const ReplyModal=db.model('Reply', ReplySchema);
module.exports = ReplyModal;
