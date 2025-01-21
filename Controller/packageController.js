const PackageService = require('../Service/packageService');
const IdcodeServices = require('../Service/idcodeService');

exports.createPackage = async (req, res, next) => {
    try {
        const { package_name, mrp, offer, features, duration } = req.body;

        // Generate package_no using IdcodeServices
        const package_no = await IdcodeServices.generateCode("Package");

        const packageData = await PackageService.createPackage({ package_no, package_name, mrp, offer, features, duration });

        res.status(200).json({
            status: true,
            message: "Package created successfully",
            data: packageData
        });
    } catch (error) {
        next(error);
    }
};

exports.getPackageByNo = async (req, res, next) => {
    try {
        const { package_no } = req.query;
        const packageData = await PackageService.getPackageByNo(package_no);

        if (!packageData) {
            return res.status(404).json({ status: false, message: "Package not found" });
        }

        res.status(200).json({
            status: true,
            message: "Package retrieved successfully",
            data: packageData
        });
    } catch (error) {
        next(error);
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
        next(error);
    }
};

exports.updatePackageByNo = async (req, res, next) => {
    try {
        const { package_no } = req.query;
        const updateData = req.body;
        const updatedPackage = await PackageService.updatePackageByNo(package_no, updateData);

        if (!updatedPackage) {
            return res.status(404).json({ status: false, message: "Package not found" });
        }

        res.status(200).json({
            status: true,
            message: "Package updated successfully",
            data: updatedPackage
        });
    } catch (error) {
        next(error);
    }
};
