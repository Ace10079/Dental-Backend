const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controller/subscriptionController');

router.post('/post', subscriptionController.createSubscription);
router.get('/get', subscriptionController.getAllSubscriptions);
router.delete('/delete', subscriptionController.deleteSubscriptionById);
router.put('/update', subscriptionController.updateSubscriptionById);

module.exports = router;
