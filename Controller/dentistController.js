const DentistService = require('../Service/dentistService');
const IdcodeServices = require('../Service/idcodeService');
const bcrypt = require('bcrypt');

// Create dentist controller
exports.createDentist = async (req, res, next) => {
    try {
        const { dentist_name, phone, email, password } = req.body;
        const dentist_id = await IdcodeServices.generateCode("Dentist");
      
        const dentist = await DentistService.createDentist({ dentist_id, dentist_name, phone, email, password });
        
        res.status(200).json({
            status: true,
            message: "Dentist created successfully",
            data: dentist
        });
    } catch (error) {
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
        const dentist = await DentistService.login(email); // Fetch dentist by email

        if (!dentist) {
            return res.status(401).json({ message: 'Dentist not found' });
        }

        console.log('Stored hashed password:', dentist.password); // Log stored hashed password

        const isMatch = await bcrypt.compare(password, dentist.password); // Compare hashed password

        console.log('Password match result:', isMatch); // Log comparison result

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({
            status: true,
            message: 'Login successful',
            data: { dentist_id: dentist.dentist_id, dentist_name: dentist.dentist_name, email: dentist.email }
        });
    } catch (error) {
        next(error);
    }
};
