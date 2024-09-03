const express = require('express');
const router = express.Router();
const saveController = require('../Controller/savecontroller');

router.post('/post', saveController.createSave);
router.get('/get', saveController.getAllSaves);
router.get('/getById', saveController.getSaveById);
router.delete('/delete', saveController.deleteSaveById);
router.put('/update', saveController.updateSaveById);

module.exports = router;
