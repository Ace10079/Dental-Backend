const express = require('express');
const router = express.Router();
const multer = require('multer');
const PatientController = require('../Controller/PatientController');
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

router.post('/post', upload.single('image'), PatientController.registerPatient);
router.put('/update', upload.single('image'), PatientController.updatePatient);
router.delete('/delete', PatientController.deletePatient);
router.get('/all', PatientController.getAllPatients);
router.get('/get', PatientController.getPatientById);
module.exports = router;