const TrialModel = require('../Models/Trial');

// Create Trial
exports.createTrial = async (trialData) => {
    const trial = new TrialModel(trialData);
    return await trial.save();
};

// Get All Trials
exports.getAllTrials = async () => {
    return await TrialModel.find();
};

// Get Trial by Dentist ID
exports.getTrialByDentistId = async (dentist_id) => {
    return await TrialModel.findOne({ dentist_id });
};

// Delete Trial by Dentist ID
exports.deleteTrialById = async (dentist_id) => {
    return await TrialModel.findOneAndDelete({ dentist_id });
};

// Update Trial by Dentist ID and increment count
exports.updateTrialByDentistId = async (dentist_id, updateData) => {
    const trial = await TrialModel.findOne({ dentist_id });

    if (!trial) return null;  // Handle case where trial is not found

    trial.count += 1;  // Increment count by 1
    Object.assign(trial, updateData);  // Update with new data

    return await trial.save();  // Save the updated trial
};
