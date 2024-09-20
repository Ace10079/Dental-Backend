const TrialService = require('../Service/trialService');

// Create Trial
exports.createTrial = async (req, res, next) => {
    try {
        const { dentist_id, count } = req.body;
        const trial = await TrialService.createTrial({ dentist_id, count });

        res.status(200).json({
            status: true,
            message: "Trial created successfully",
            data: trial
        });
    } catch (error) {
        next(error);
    }
};

// Get All Trials
exports.getAllTrials = async (req, res, next) => {
    try {
        const trials = await TrialService.getAllTrials();
        res.status(200).json({
            status: true,
            message: "Trials retrieved successfully",
            data: trials
        });
    } catch (error) {
        next(error);
    }
};

// Get Trial by Dentist ID
exports.getTrialByDentistId = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const trial = await TrialService.getTrialByDentistId(dentist_id);

        if (!trial) {
            return res.status(404).json({ status: false, message: "Trial not found" });
        }

        res.status(200).json({
            status: true,
            message: "Trial retrieved successfully",
            data: trial
        });
    } catch (error) {
        next(error);
    }
};

// Delete Trial by Dentist ID
exports.deleteTrialById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const result = await TrialService.deleteTrialById(dentist_id);

        if (!result) {
            return res.status(404).json({ status: false, message: "Trial not found" });
        }

        res.status(200).json({
            status: true,
            message: "Trial deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

// Update Trial by Dentist ID and increment count
exports.updateTrialByDentistId = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const updateData = req.body;

        const updatedTrial = await TrialService.updateTrialByDentistId(dentist_id, updateData);

        if (!updatedTrial) {
            return res.status(404).json({ status: false, message: "Trial not found" });
        }

        res.status(200).json({
            status: true,
            message: "Trial updated successfully and count incremented",
            data: updatedTrial
        });
    } catch (error) {
        next(error);
    }
};
