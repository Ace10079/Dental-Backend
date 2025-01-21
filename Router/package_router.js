const express = require('express');
const router = express.Router();
const packageController = require('../Controller/packageController');

router.post('/post', packageController.createPackage);
router.get('/getByNo', packageController.getPackageByNo);
router.get('/getAll', packageController.getAllPackages);
router.put('/update', packageController.updatePackageByNo);

module.exports = router;