const express = require('express');
const router = express.Router();
const FeedbackController = require('../Controller/feedbackController');

// Define routes
router.post('/post', FeedbackController.createFeedback);
router.get('/get', FeedbackController.getAllFeedback);

module.exports = router;
