const FeedbackService = require('../Service/FeedbackService');

exports.createFeedback = async (req, res, next) => {
    try {
        const { dentist_reg_number,dentist_name, response, comment } = req.body;
        const feedback = await FeedbackService.createFeedback({ dentist_reg_number,dentist_name, response, comment });

        res.status(201).json({ status: true, message: "Feedback created successfully", data: feedback });
    } catch (error) {
        next(error);
    }
};

exports.getAllFeedback = async (req, res, next) => {
    try {
        const feedbackList = await FeedbackService.getAllFeedback();
        res.status(200).json({ status: true, message: "Feedback retrieved successfully", data: feedbackList });
    } catch (error) {
        next(error);
    }
};
