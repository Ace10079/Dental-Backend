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

// Define routes
const upload = multer({ storage: storage }).single('attachment');
router.post('/post', upload, SupportController.createSupportTicket);
router.put('/update', upload, SupportController.updateSupportTicket);
router.delete('/delete', SupportController.deleteSupportTicket);
router.get('/all', SupportController.getAllSupportTickets);
router.get('/get', SupportController.getSupportTicketByNo);
module.exports = router;
