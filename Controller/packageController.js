const PackageService = require('../Service/packageService');
const IdcodeServices = require('../Service/idcodeService');
const moment = require("moment");

exports.createPackage = async (req, res, next) => {
    try {
        const { package_name, mrp, offer, features, duration } = req.body;

        if (!package_name || !mrp || !offer || !features || !duration) {
            return res.status(400).json({ 
                status: false, 
                message: "All fields (package_name, mrp, offer, features, duration) are required." 
            });
        }

        // Generate a unique package_no
        const package_no = await IdcodeServices.generateCode("Package");

        // Calculate expiry date based on the duration in months
        const expiry = moment().add(duration, "months").toDate();

        const packageData = await PackageService.createPackage({ 
            package_no, 
            package_name, 
            mrp, 
            offer, 
            features, 
            duration, 
            expiry // Add the calculated expiry date
        });

        res.status(201).json({
            status: true,
            message: "Package created successfully",
            data: packageData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while creating the package.",
            error: error.message
        });
    }
};

exports.getPackageByNo = async (req, res, next) => {
    try {
        const { package_no } = req.query;

        if (!package_no) {
            return res.status(400).json({ 
                status: false, 
                message: "Package number (package_no) is required." 
            });
        }

        const packageData = await PackageService.getPackageByNo(package_no);

        if (!packageData) {
            return res.status(404).json({ 
                status: false, 
                message: "Package not found" 
            });
        }

        res.status(200).json({
            status: true,
            message: "Package retrieved successfully",
            data: packageData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the package.",
            error: error.message
        });
    }
};

exports.getAllPackages = async (req, res, next) => {
    try {
        const packages = await PackageService.getAllPackages();
        res.status(200).json({
            status: true,
            message: "Packages retrieved successfully",
            data: packages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the packages.",
            error: error.message
        });
    }
};

exports.updatePackageByNo = async (req, res, next) => {
    try {
        const { package_no } = req.query;
        const updateData = req.body;

        if (!package_no) {
            return res.status(400).json({ 
                status: false, 
                message: "Package number (package_no) is required for updating." 
            });
        }

        // If duration is updated, recalculate the expiry date
        if (updateData.duration) {
            updateData.expiry = moment().add(updateData.duration, "months").toDate();
        }

        const updatedPackage = await PackageService.updatePackageByNo(package_no, updateData);

        if (!updatedPackage) {
            return res.status(404).json({ 
                status: false, 
                message: "Package not found" 
            });
        }

        res.status(200).json({
            status: true,
            message: "Package updated successfully",
            data: updatedPackage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while updating the package.",
            error: error.message
        });
    }
};
exports.deletePackageByNo = async (req, res, next) => {
    try {
        const { package_no } = req.query;

        if (!package_no) {
            return res.status(400).json({ 
                status: false, 
                message: "Package number (package_no) is required for deletion." 
            });
        }

        const deletedPackage = await PackageService.deletePackageByNo(package_no);

        if (!deletedPackage) {
            return res.status(404).json({ 
                status: false, 
                message: "Package not found" 
            });
        }

        res.status(200).json({
            status: true,
            message: "Package deleted successfully",
            data: deletedPackage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while deleting the package.",
            error: error.message
        });
    }
};
