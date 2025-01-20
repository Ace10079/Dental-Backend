const ReplyModel = require('../Models/Reply');

// Create a new reply
exports.createReply = async (replyData) => {
    const reply = new ReplyModel(replyData);
    return await reply.save();
};

// Get replies by ticket number
exports.getRepliesByTicketNo = async (ticket_no) => {
    return await ReplyModel.find({ ticket_no }).sort({ created_at: 1 }); // Sort by created_at ascending
};
