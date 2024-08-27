const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PatientController = require('../Controller/PatientController');

// Configure multer for file uploads
const upload = multer({ 
    dest: path.join(__dirname, '..', 'uploads') // Ensure the uploads folder path is correct
});

// Define routes
router.post('/post', upload.single('image'), PatientController.registerPatient);
router.put('/update', upload.single('image'), PatientController.updatePatient);
router.delete('/delete', PatientController.deletePatient);
router.get('/all', PatientController.getAllPatients);
router.get('/get', PatientController.getPatientById);

module.exports = router;
