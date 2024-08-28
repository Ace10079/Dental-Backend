const AdminService = require('../Service/adminService');
const IdcodeServices=require('../Service/idcodeService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Use JWT for generating tokens

// Login admin
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Find admin by email
        const admin = await AdminService.getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }
        
        // Generate token
        const token = jwt.sign({ admin_id: admin.admin_id }, 'Dental', { expiresIn: '1h' });
        
        res.status(200).json({
            status: true,
            message: "Login successful",
            token // Include token in the response
        });
    } catch (error) {
        next(error);
    }
};
exports.createAdmin = async (req, res, next) => {
    try {
        const { admin_name, email, password } = req.body;
        const admin_id = await IdcodeServices.generateCode("Admin");
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
