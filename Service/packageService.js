const PackageModel = require('../Models/Package');

exports.createPackage = async (packageData) => {
    const existingPackage = await PackageModel.findOne({ package_name: packageData.package_name });

    if (existingPackage) {
        throw new Error('Package with the same name already exists.');
    }

    const newPackage = new PackageModel(packageData);
    return await newPackage.save();
};

exports.getPackageByNo = async (package_no) => {
    return await PackageModel.findOne({ package_no });
};

exports.getAllPackages = async () => {
    return await PackageModel.find();
};

exports.updatePackageByNo = async (package_no, updateData) => {
    return await PackageModel.findOneAndUpdate({ package_no }, updateData, { new: true });
};
exports.deletePackageByNo = async (package_no) => {
    return await PackageModel.findOneAndDelete({ package_no });
};
