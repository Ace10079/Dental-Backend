const ReplyService = require('../Service/ReplyService');

// Send a reply
exports.sendReply = async (req, res, next) => {
    try {
        const { ticket_no, reply } = req.body;

        if (!ticket_no || !reply) {
            return res.status(400).json({ status: false, message: "ticket_no and reply are required" });
        }

        const replyData = { ticket_no, reply };
        const savedReply = await ReplyService.createReply(replyData);

        res.status(201).json({ status: true, message: "Reply saved successfully", data: savedReply });
    } catch (error) {
        next(error);
    }
};

// Get replies by ticket number
exports.getRepliesByTicketNo = async (req, res, next) => {
    try {
        const { ticket_no } = req.query;

        if (!ticket_no) {
            return res.status(400).json({ status: false, message: "ticket_no is required" });
        }

        const replies = await ReplyService.getRepliesByTicketNo(ticket_no);

        if (!replies || replies.length === 0) {
            return res.status(404).json({ status: false, message: "No replies found for this ticket" });
        }

        res.status(200).json({ status: true, message: "Replies retrieved successfully", data: replies });
    } catch (error) {
        next(error);
    }
};
