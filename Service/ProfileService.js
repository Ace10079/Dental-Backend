const ProfileModel = require('../Models/Profile');

class ProfileService {
    static async createProfile(profileData, imageFilename) {
        try {
            const newProfile = new ProfileModel({ ...profileData, img: imageFilename });
            return await newProfile.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateProfile(dentist_id, updateData) {
        try {
            return await ProfileModel.findOneAndUpdate({ dentist_id }, updateData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async getProfileByDentistId(dentist_id) {
        try {
            return await ProfileModel.findOne({ dentist_id });
        } catch (error) {
            throw error;
        }
    }

    static async deleteProfile(dentist_id) {
        try {
            return await ProfileModel.findOneAndDelete({ dentist_id });
        } catch (error) {
            throw error;
        }
    }

    static async getAllProfiles() {
        try {
            return await ProfileModel.find({});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProfileService;
