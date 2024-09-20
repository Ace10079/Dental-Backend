const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ProfileController = require('../Controller/ProfileController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Define routes
const upload = multer({ storage: storage }).single('img');
router.post('/post', upload, ProfileController.createProfile);
router.put('/update', upload, ProfileController.updateProfile);
router.delete('/delete', ProfileController.deleteProfile);
router.get('/getbyid', ProfileController.getProfileByDentistId);
router.get('/get', ProfileController.getAllProfiles);

module.exports = router;
