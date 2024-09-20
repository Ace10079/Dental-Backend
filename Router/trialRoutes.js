const express = require('express');
const router = express.Router();
const trialController = require('../Controller/trialController');

router.post('/post', trialController.createTrial);
router.get('/get', trialController.getAllTrials);
router.get('/getbyid', trialController.getTrialByDentistId);
router.delete('/delete', trialController.deleteTrialById);
router.put('/update', trialController.updateTrialByDentistId);

module.exports = router;
