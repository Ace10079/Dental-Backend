const express = require('express');
const router = express.Router();
const dentistController = require('../Controller/dentistController');

// Existing routes
router.post('/post', dentistController.createDentist);
router.post('/login', dentistController.login);
router.get('/get', dentistController.getAllDentists);
router.delete('/delete', dentistController.deleteDentistById);
router.put('/update', dentistController.updateDentistById);

// New routes for forgot password and reset password
router.post('/forgotPassword', dentistController.forgotPassword);
router.post('/resetPassword/:token', dentistController.resetPassword);
router.post('/updatePassword', dentistController.updatePassword);


module.exports = router;
