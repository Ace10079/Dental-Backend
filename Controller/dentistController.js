const DentistService = require('../Service/dentistService');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const IdcodeServices = require('../Service/idcodeService');  // Importing IdcodeServices

// Create dentist controller
exports.createDentist = async (req, res, next) => {
    try {
        const { dentist_name, dentist_reg_number, phone, email, password } = req.body;

        // Generate dentist_id using the IdcodeServices
        const dentist_id = await IdcodeServices.generateCode("Dentist");

        const dentist = await DentistService.createDentist({ dentist_id, dentist_name, dentist_reg_number, phone, email, password });

        res.status(200).json({
            status: true,
            message: "Dentist created successfully",
            data: dentist
        });
    } catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(409).json({
                status: false,
                message: error.message
            });
        }
        next(error);
    }
};

exports.getAllDentists = async (req, res, next) => {
    try {
        const dentists = await DentistService.getAllDentists();
        res.status(200).json({
            status: true,
            message: "Dentists retrieved successfully",
            data: dentists
        });
    } catch (error) {
        next(error);
    }
};

exports.getDentistById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const dentist = await DentistService.getDentistById(dentist_id);
        if (!dentist) {
            return res.status(404).json({ status: false, message: "Dentist not found" });
        }
        res.status(200).json({
            status: true,
            message: "Dentist retrieved successfully",
            data: dentist
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteDentistById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const result = await DentistService.deleteDentistById(dentist_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Dentist not found" });
        }
        res.status(200).json({
            status: true,
            message: "Dentist deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDentistById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const updateData = req.body;
        const updatedDentist = await DentistService.updateDentistById(dentist_id, updateData);

        if (!updatedDentist) {
            return res.status(404).json({ status: false, message: "Dentist not found" });
        }

        res.status(200).json({
            status: true,
            message: "Dentist updated successfully",
            data: updatedDentist
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch dentist by email
        const dentist = await DentistService.login(email);

        if (!dentist) {
            return res.status(401).json({ message: 'Dentist not found' });
        }

        // Compare the input password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, dentist.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({
            status: true,
            message: 'Login successful',
            data: {
                dentist_id: dentist.dentist_id,
                dentist_name: dentist.dentist_name,
                email: dentist.email,
                phone: dentist.phone,
                dentist_reg_number: dentist.dentist_reg_number
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { phone } = req.body;
        const dentist = await DentistService.findDentistByPhone(phone);

        if (!dentist) {
            return res.status(404).json({ message: 'Dentist not found' });
        }

        const resetToken = dentist.createPasswordResetToken();
        await dentist.save();

        const resetURL = `${req.protocol}://${req.get('host')}/dentist/resetPassword/${resetToken}`;

        // You would send this resetURL to the user's phone via SMS.
        res.status(200).json({
            status: true,
            message: 'Password reset token sent to phone!',
            resetURL
        });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const dentist = await DentistService.findDentistByResetToken(hashedToken);

        if (!dentist) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        dentist.password = password;  // The password will be hashed in the pre-save hook
        dentist.passwordResetToken = undefined;
        dentist.passwordResetExpires = undefined;
        await dentist.save();

        res.status(200).json({
            status: true,
            message: 'Password has been reset!'
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        // Find the dentist by email
        const dentist = await DentistService.login(email);

        if (!dentist) {
            return res.status(404).json({ status: false, message: "Dentist not found" });
        }

        // Generate a password reset token (like the forgot password mechanism)
        const resetToken = dentist.createPasswordResetToken();
        await dentist.save();

        const resetURL = `${req.protocol}://${req.get('host')}/dentist/resetPassword/${resetToken}`;

        // You would send this resetURL to the user's email.
        res.status(200).json({
            status: true,
            message: 'Password reset token sent to email!',
            resetURL
        });
    } catch (error) {
        next(error);
    }
};

