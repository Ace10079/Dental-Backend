const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');

router.post('/post', adminController.createAdmin);
router.get('/get', adminController.getAllAdmin);
router.delete('/delete', adminController.deleteAdminById);
router.put('/update', adminController.updatePassword);
router.post('/login', adminController.loginAdmin);
router.put('/update-admin',adminController.updateAdminById)

module.exports = router;