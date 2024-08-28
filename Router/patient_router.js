const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PatientController = require('../Controller/PatientController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Define routes
const upload = multer({ storage: storage }).single('img');
router.post('/post', upload, PatientController.registerPatient);
router.put('/update', upload, PatientController.updatePatient);
router.delete('/delete', PatientController.deletePatient);
router.get('/all', PatientController.getAllPatients);
router.get('/get', PatientController.getPatientById);
router.get('/get/dentist',PatientController.getPatientByDentistId);

module.exports = router;
