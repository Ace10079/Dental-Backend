const express = require('express');
const router = express.Router();
const dentistController = require('../Controller/dentistController');

router.post('/post', dentistController.createDentist);
router.get('/get', dentistController.getAllDentists);
router.delete('/delete', dentistController.deleteDentistById);
router.put('/update', dentistController.updateDentistById);
module.exports = router;