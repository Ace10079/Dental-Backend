const DentistModel = require('../Models/dentist');

exports.createDentist = async (dentistData) => {
    // Check for existing dentist with the same email or phone
    const existingDentist = await DentistModel.findOne({
        $or: [
            { email: dentistData.email },
            { phone: dentistData.phone }
        ]
    });

    if (existingDentist) {
        const duplicateField = existingDentist.email === dentistData.email ? 'email' : 'phone';
        throw new Error(`Dentist with the same ${duplicateField} already exists.`);
    }

    // Create a new dentist if no duplicate found
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
exports.findDentistByPhone = async (phone) => {
    return await DentistModel.findOne({ phone });
};
