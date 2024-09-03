const SaveModel = require('../Models/save');

exports.createSave = async (saveData) => {
    const save = new SaveModel(saveData);
    return await save.save();
};

exports.getAllSaves = async () => {
    return await SaveModel.find();
};

exports.getSaveById = async (patient_id) => {
    return await SaveModel.findOne({ patient_id });
};

exports.deleteSaveById = async (patient_id) => {
    return await SaveModel.findOneAndDelete({ patient_id });
};

exports.updateSaveById = async (patient_id, updateData) => {
    return await SaveModel.findOneAndUpdate({ patient_id }, updateData, { new: true });
};
