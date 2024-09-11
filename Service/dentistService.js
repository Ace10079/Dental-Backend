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

exports.login = async (email) => {
    return await DentistModel.findOne({ email });
};

exports.findDentistByResetToken = async (token) => {
    return await DentistModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
    });
};
