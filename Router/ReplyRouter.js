const express = require('express');
const ReplyController = require('../Controller/ReplyController');

const router = express.Router();

// Route to send a reply
router.post('/post', ReplyController.sendReply);

// Route to get replies by ticket number
router.get('/get', ReplyController.getRepliesByTicketNo);

module.exports = router;
