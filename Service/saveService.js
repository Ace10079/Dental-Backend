const SaveModel = require('../Models/save');

exports.createSave = async (saveData) => {
    const save = new SaveModel(saveData);
    return await save.save();
};

exports.getAllSaves = async () => {
    return await SaveModel.find();
};

exports.getSaveById = async (dentist_id ) => {
    return await SaveModel.find({ dentist_id  });
};

exports.deleteSaveById = async (_id) => {
    return await SaveModel.findByIdAndDelete(_id);
};


exports.updateSaveById = async (patient_id, updateData) => {
    return await SaveModel.findOneAndUpdate({ patient_id }, updateData, { new: true });
};
exports.deleteSaveByPatientId = async (patient_id) => {
    return await SaveModel.findOneAndDelete({ patient_id }); // Use patient_id instead of _id
};
