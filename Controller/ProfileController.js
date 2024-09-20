const ProfileService = require('../Service/ProfileService');

exports.createProfile = async (req, res, next) => {
    try {
        const { dentist_id } = req.body;

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ status: false, message: "No file uploaded" });
        }

        const imgFilename = req.file.filename;

        const profile = await ProfileService.createProfile({ dentist_id }, imgFilename);

        res.status(201).json({ status: true, message: "Profile created successfully", data: profile });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const updateData = req.body;

        if (req.file && req.file.filename) {
            updateData.img = req.file.filename;
        }

        const updatedProfile = await ProfileService.updateProfile(dentist_id, updateData);

        if (!updatedProfile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }

        res.status(200).json({ status: true, message: "Profile updated successfully", data: updatedProfile });
    } catch (error) {
        next(error);
    }
};

exports.getProfileByDentistId = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const profile = await ProfileService.getProfileByDentistId(dentist_id);

        if (!profile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }

        res.status(200).json({ status: true, message: "Profile retrieved successfully", data: profile });
    } catch (error) {
        next(error);
    }
};

exports.deleteProfile = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const deletedProfile = await ProfileService.deleteProfile(dentist_id);

        if (!deletedProfile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }

        res.status(200).json({ status: true, message: "Profile deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await ProfileService.getAllProfiles();
        res.status(200).json({ status: true, message: "Profiles retrieved successfully", data: profiles });
    } catch (error) {
        next(error);
    }
};
