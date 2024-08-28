const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');

router.post('/post', adminController.createAdmin);
router.get('/get', adminController.getAllAdmin);
router.delete('/delete', adminController.deleteAdminById);
router.put('/update', adminController.updateAdminById);
router.post('/login', adminController.loginAdmin);

module.exports = router;