const AdminService = require('../Service/adminService');
const IdcodeServices=require('../Service/idcodeService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Use JWT for generating tokens

// Login admin
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const admin = await AdminService.getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }
        
        console.log("Stored Hashed Password:", admin.password);
        
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Password Match:", isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ admin_id: admin.admin_id }, 'Dental', { expiresIn: '1h' });

        res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            admin_id: admin.admin_id,
            admin_name: admin.admin_name,
            email: admin.email  // Include this field
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

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

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

exports.updatePassword = async (req, res, next) => {
    try {
        const { admin_name, email, old_password, new_password } = req.body;

        // Fetch the admin by email
        const admin = await AdminService.getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(old_password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);
        
        // Update the password in the database
        await AdminService.updateAdmin(email, {
            password: hashedPassword,
            updatedAt: new Date() // Optional: update timestamp
        });

        res.status(200).json({
            status: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        next(error);
    }
};
