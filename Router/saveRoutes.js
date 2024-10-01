const express = require('express');
const router = express.Router();
const saveController = require('../Controller/savecontroller');

router.post('/post', saveController.createSave);
router.get('/get', saveController.getAllSaves);
router.get('/getbyid/dentist', saveController.getSaveById);
router.delete('/delete', saveController.deleteSaveById);
router.put('/update', saveController.updateSaveById);
router.delete('/deletebypatientid',saveController.deleteSaveByPatientId)
module.exports = router;
