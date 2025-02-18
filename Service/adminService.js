const bcrypt = require('bcrypt');
const AdminModel = require('../Models/admin'); // Ensure correct import

exports.createAdmin = async (adminData) => {
    const admin = new AdminModel(adminData);
    return await admin.save();
};

exports.getAllAdmin = async () => {
    return await AdminModel.find();
};

exports.deleteAdminById = async (admin_id) => {
    return await AdminModel.findOneAndDelete({ admin_id });
};

exports.updateAdminById = async (admin_id, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await AdminModel.findOneAndUpdate({ admin_id }, updateData, { new: true });
};

// ✅ FIXED: Use AdminModel instead of Admin
exports.getAdminByEmail = async (email) => {
    return await AdminModel.findOne({ email });
};

exports.updateAdmin = async (email, updateData) => {
    return await AdminModel.findOneAndUpdate({ email }, updateData, { new: true });
};

exports.getAdminById = async (admin_id) => {
    return await AdminModel.findOne({ admin_id });
};
