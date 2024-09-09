const SaveService = require('../Service/saveService');

// Create Save
exports.createSave = async (req, res, next) => {
    try {
        const {
           
            patient_name,
            tooth_number,
            gender,
            age,
            phone_number,
            image,
            dentist_id,
            class1,
            probability1,
            class2,
            probability2,
            class3,
            probability3
        } = req.body;

        const save = await SaveService.createSave({
         
            patient_name,
            tooth_number,
            gender,
            age,
            phone_number,
            image,
            dentist_id,
            class1,
            probability1,
            class2,
            probability2,
            class3,
            probability3
        });

        res.status(200).json({
            status: true,
            message: "Save created successfully",
            data: save
        });
    } catch (error) {
        next(error);
    }
};

// Get All Saves
exports.getAllSaves = async (req, res, next) => {
    try {
        const saves = await SaveService.getAllSaves();
        res.status(200).json({
            status: true,
            message: "Saves retrieved successfully",
            data: saves
        });
    } catch (error) {
        next(error);
    }
};

// Get Save by Patient ID
exports.getSaveById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const save = await SaveService.getSaveById(dentist_id );
        if (!save) {
            return res.status(404).json({ status: false, message: "Save not found" });
        }
        res.status(200).json({
            status: true,
            message: "Save retrieved successfully",
            data: save
        });
    } catch (error) {
        next(error);
    }
};

// Delete Save by Patient ID
exports.deleteSaveById = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const result = await SaveService.deleteSaveById(dentist_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Save not found" });
        }
        res.status(200).json({
            status: true,
            message: "Save deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

// Update Save by Patient ID
exports.updateSaveById = async (req, res, next) => {
    try {
        const { patient_id } = req.query;
        const updateData = req.body;
        const updatedSave = await SaveService.updateSaveById(patient_id, updateData);
        
        if (!updatedSave) {
            return res.status(404).json({ status: false, message: "Save not found" });
        }
        
        res.status(200).json({
            status: true,
            message: "Save updated successfully",
            data: updatedSave
        });
    } catch (error) {
        next(error);
    }
};
