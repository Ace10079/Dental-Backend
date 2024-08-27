const AdminService = require('../Service/adminService');
const IdcodeServices=require('../Service/idcodeService')
// Create dentist controller
exports.createAdmin = async (req, res, next) => {
    try {
        const { admin_name, email, password } = req.body;
        const admin_id = await IdcodeServices.generateCode("Admin");
        // Create admin with password
        const admin = await AdminService.createAdmin({ admin_id, admin_name, email, password });

        // Response with admin data (including password)
        res.status(200).json({
            status: true,
            message: "Admin created successfully",
            data: admin // This will include the password
        });
    } catch (error) {
        next(error);
    }
};



exports.getAllAdmin = async (req, res, next) => {
    try {
        const admins = await AdminService.getAllAdmin();
        res.status(200).json({
            status: true,
            message: "Admin retrieved successfully",
            data: admins
        });
    } catch (error) {
        next(error);
    }
};





exports.deleteAdminById = async (req, res, next) => {
    try {
        const { admin_id } = req.query;
        const result = await AdminService.deleteAdminById(admin_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }
        res.status(200).json({
            status: true,
            message: "Admin deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
exports.updateAdminById = async (req, res, next) => {
    try {
        const { admin_id } = req.query;
        const updateData = req.body;
        const updatedAdmin = await AdminService.updateAdminById(admin_id, updateData);
        
        if (!updatedAdmin) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }
        
        res.status(200).json({
            status: true,
            message: "Admin updated successfully",
            data: updatedAdmin
        });
    } catch (error) {
        next(error);
    }
};
