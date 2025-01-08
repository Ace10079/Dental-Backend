const SupportModel = require('../Models/Support');
const IdcodeServices = require('../Service/idcodeService'); // Importing IdcodeServices

// Create Support Ticket
exports.createTicket = async (supportData) => {
    // Check if a ticket with the same ticket_no already exists
    const existingTicket = await SupportModel.findOne({ ticket_no: supportData.ticket_no });
    if (existingTicket) {
        throw new Error('Support ticket with this ticket_no already exists.');
    }

    // Generate unique ticket_no using IdcodeServices
    const ticket_no = await IdcodeServices.generateCode('Support');
    supportData.ticket_no = ticket_no;

    const supportTicket = new SupportModel(supportData);
    return await supportTicket.save();
};

// Retrieve All Tickets
exports.getAllTickets = async () => {
    return await SupportModel.find();
};

// Retrieve Ticket by Ticket No
exports.getTicketByNo = async (ticket_no) => {
    return await SupportModel.findOne({ ticket_no });
};

// Update Ticket by Ticket No
exports.updateTicketByNo = async (ticket_no, updateData) => {
    return await SupportModel.findOneAndUpdate(
        { ticket_no },
        updateData,
        { new: true }
    );
};

// Delete Ticket by Ticket No
exports.deleteTicketByNo = async (ticket_no) => {
    return await SupportModel.findOneAndDelete({ ticket_no });
};
