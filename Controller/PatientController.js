const PatientService = require('../Service/PatientService');
exports.registerPatient = async (req, res, next) => {
    try {
        const { patient_name, tooth_number, gender, age, phone_number } = req.body;
        if (!req.file || !req.file.filename) {
            return res.status(400).json({ status: false, message: "No file uploaded" });
        }
        const imageFilename = req.file.filename;
        const patient = await PatientService.registerPatient(
            { patient_name, tooth_number, gender, age, phone_number },
            imageFilename
        );
        res.status(201).json({ status: true, message: "Patient registered successfully", data: patient });
    } catch (error) {
        next(error);
    }
};

exports.updatePatient = async (req, res, next) => {
    try {
        const { patient_id } = req.query;
        const updateData = req.body;
        if (req.file && req.file.filename) {
            updateData.image = req.file.filename;
        }
        const updatedPatient = await PatientService.updatePatient(patient_id, updateData);
        if (!updatedPatient) {
            return res.status(404).json({ status: false, message: "Patient not found" });
        }
        res.status(200).json({ status: true, message: "Patient updated successfully", data: updatedPatient });
    } catch (error) {
        next(error);
    }
};

exports.deletePatient = async (req, res, next) => {
    try {
        const { patient_id } = req.query;
        const deletedPatient = await PatientService.deletePatient(patient_id);
        if (!deletedPatient) {
            return res.status(404).json({ status: false, message: "Patient not found" });
        }
        res.status(200).json({ status: true, message: "Patient deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getAllPatients = async (req, res, next) => {
    try {
        const patients = await PatientService.getAllPatients();
        res.status(200).json({ status: true, message: "All Patients retrieved successfully", data: patients });
    } catch (error) {
        next(error);
    }
};

exports.getPatientById = async (req, res, next) => {
    try {
        const { patient_id } = req.query;
        const patient = await PatientService.getPatientById(patient_id);
        if (!patient) {
            return res.status(404).json({ status: false, message: "Patient not found" });
        }
        res.status(200).json({ status: true, message: "Patient retrieved successfully", data: patient });
    } catch (error) {
        next(error);
    }
};
