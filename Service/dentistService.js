const DentistModel = require('../Models/dentist');

exports.createDentist = async (dentistData) => {
    const dentist = new DentistModel(dentistData);
    return await dentist.save();
};

exports.getAllDentists = async () => {
    return await DentistModel.find();
};

exports.getDentistById = async (dentist_id) => {
    return await DentistModel.findOne({ dentist_id });
};

exports.deleteDentistById = async (dentist_id) => {
    return await DentistModel.findOneAndDelete({ dentist_id });
};
exports.updateDentistById = async (dentist_id, updateData) => {
    return await DentistModel.findOneAndUpdate({ dentist_id }, updateData, { new: true });
};