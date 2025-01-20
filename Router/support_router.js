const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SupportController = require('../Controller/SupportController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Max 2 files
const upload = multer({ 
    storage: storage,
    limits: { files: 2 }
}).array('attachment', 2); // Accepting up to 2 files

// Update the routes to handle multiple file uploads
router.post('/post', upload, SupportController.createSupportTicket);
router.put('/update', upload, SupportController.updateSupportTicket);
router.delete('/delete', SupportController.deleteSupportTicket);
router.get('/all', SupportController.getAllSupportTickets);
router.get('/get', SupportController.getSupportTicketByNo);
router.get('/by-dentist', SupportController.getSupportTicketsByDentistId);
router.post('/reply', SupportController.sendReply);
module.exports = router;
