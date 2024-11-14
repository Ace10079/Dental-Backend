const FeedbackModel = require('../Models/feedback');

class FeedbackService {
    static async createFeedback(feedbackData) {
        try {
            const newFeedback = new FeedbackModel(feedbackData);
            return await newFeedback.save();
        } catch (error) {
            throw error;
        }
    }

    static async getAllFeedback() {
        try {
            return await FeedbackModel.find({});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FeedbackService;
