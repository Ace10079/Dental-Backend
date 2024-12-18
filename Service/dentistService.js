const DentistModel = require('../Models/dentist');

const bcrypt = require('bcrypt');
exports.createDentist = async (dentistData) => {
    // Check for existing dentist with the same email or phone
    const existingDentist = await DentistModel.findOne({
      $or: [
        { email: dentistData.email },
        { phone: dentistData.phone },
      ],
    });
  
    if (existingDentist) {
      const duplicateField = existingDentist.email === dentistData.email ? 'email' : 'phone';
      throw new Error(`Dentist with the same ${duplicateField} already exists.`);
    }
  
    // Generate a salt and hash the password securely
    const saltRounds = 10; // Adjust as needed (higher values increase security but take longer)
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dentistData.password, salt);
  
    // Store the hashed password instead of the plain text password
    dentistData.password = hashedPassword;
  
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
exports.updatePasswordByEmail = async (email, newPassword) => {
    const dentist = await DentistModel.findOne({ email });
  
    if (!dentist) {
      throw new Error('Dentist not found');
    }
  
    // Generate a new salt and hash the new password
    const saltRounds = 10; // Adjust as needed
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    // Update the dentist's password with the new hashed value
    dentist.password = hashedPassword;
  
    await dentist.save();
  
    return dentist;
  };
  