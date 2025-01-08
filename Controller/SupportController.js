const SupportService = require('../Service/SupportService');
const IdcodeServices = require('../Service/idcodeService');
exports.createSupportTicket = async (req, res, next) => {
    try {
        const { name, details, phone } = req.body;

        // Generate ticket_no using the IdcodeServices
        const ticket_no = await IdcodeServices.generateCode("Support");

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ status: false, message: "No file uploaded" });
        }

        const attachmentFilename = req.file.filename;

        const ticket = await SupportService.createTicket(
            { ticket_no, name, details, phone, attachment: attachmentFilename }
        );

        res.status(201).json({ status: true, message: "Support ticket created successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};


exports.updateSupportTicket = async (req, res, next) => {
    try {
        const { ticket_no } = req.query;
        const updateData = req.body;

        if (req.file && req.file.filename) {
            updateData.attachment = req.file.filename;
        }

        const updatedTicket = await SupportService.updateTicketByNo(ticket_no, updateData);

        if (!updatedTicket) {
            return res.status(404).json({ status: false, message: "Ticket not found" });
        }

        res.status(200).json({ status: true, message: "Support ticket updated successfully", data: updatedTicket });
    } catch (error) {
        next(error);
    }
};

exports.deleteSupportTicket = async (req, res, next) => {
    try {
        const { ticket_no } = req.query;
        const deletedTicket = await SupportService.deleteTicketByNo(ticket_no);

        if (!deletedTicket) {
            return res.status(404).json({ status: false, message: "Ticket not found" });
        }

        res.status(200).json({ status: true, message: "Support ticket deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getAllSupportTickets = async (req, res, next) => {
    try {
        const tickets = await SupportService.getAllTickets();
        res.status(200).json({ status: true, message: "All tickets retrieved successfully", data: tickets });
    } catch (error) {
        next(error);
    }
};

exports.getSupportTicketByNo = async (req, res, next) => {
    try {
        const { ticket_no } = req.query;
        const ticket = await SupportService.getTicketByNo(ticket_no);

        if (!ticket) {
            return res.status(404).json({ status: false, message: "Ticket not found" });
        }

        res.status(200).json({ status: true, message: "Ticket retrieved successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};
