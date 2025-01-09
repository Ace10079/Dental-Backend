const SupportService = require('../Service/SupportService');
const IdcodeServices = require('../Service/idcodeService');
exports.createSupportTicket = async (req, res, next) => {
    try {
        const { dentist_id, dentist_name, subject, details, phone, status } = req.body;

        // Generate ticket_no using IdcodeServices
        const ticket_no = await IdcodeServices.generateCode("Support");

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ status: false, message: "No files uploaded" });
        }

        const attachments = req.files.map(file => file.filename); // Get all uploaded filenames

        const ticket = await SupportService.createTicket({
            ticket_no,
            dentist_id,
            dentist_name,
            subject,
            details,
            phone,
            status,
            attachment: attachments // Store all filenames as an array
        });

        res.status(201).json({ status: true, message: "Support ticket created successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};



exports.updateSupportTicket = async (req, res, next) => {
    try {
        const { ticket_no } = req.query;
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            updateData.attachment = req.files.map(file => file.filename); // Store all uploaded filenames
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
exports.getSupportTicketsByDentistId = async (req, res, next) => {
    try {
        const { dentist_id } = req.query; // Get dentist_id from query

        const tickets = await SupportService.getTicketsByDentistId(dentist_id);

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ status: false, message: "No tickets found for this dentist" });
        }

        res.status(200).json({ status: true, message: "Tickets retrieved successfully", data: tickets });
    } catch (error) {
        next(error);
    }
};

