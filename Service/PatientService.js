// services/PatientService.js

const PatientModel = require('../Models/Patient');
const IdcodeServices = require('../Service/idcodeService');

class PatientService {
    static async registerPatient(patientData, imageFilename) {
        try {
            const patient_id = await IdcodeServices.generateCode("Patient");
            const newPatient = new PatientModel({ ...patientData, patient_id, image: imageFilename });
            return await newPatient.save();
        } catch (error) {
            throw error;
        }
    }

    static async getPatientById(patient_id) {
        try {
            return await PatientModel.findOne({ patient_id });
        } catch (error) {
            throw error;
        }
    }
    static async getPatientByDentistId(dentist_id) {
        try {
            return await PatientModel.findOne({ dentist_id });
        } catch (error) {
            throw error;
        }
    }

    static async getAllPatients() {
        try {
            return await PatientModel.find({});
        } catch (error) {
            throw error;
        }
    }

    static async updatePatient(patient_id, updateData) {
        try {
            return await PatientModel.findOneAndUpdate({ patient_id }, updateData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async deletePatient(patient_id) {
        try {
            return await PatientModel.findOneAndDelete({ patient_id });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PatientService;
