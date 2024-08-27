const DentistService = require('../Service/dentistService');

// Create dentist controller
exports.createDentist = async (req, res, next) => {
    try {
        const {dentist_id, dentist_name, phone, email } = req.body;
      
        const dentist = await DentistService.createDentist({ dentist_id, dentist_name, phone, email });
        
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
