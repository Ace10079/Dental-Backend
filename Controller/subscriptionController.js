const SubscriptionService = require('../Service/subscriptionService');
const IdcodeServices=require('../Service/idcodeService')
exports.createSubscription = async (req, res, next) => {
    try {
        const { customer_name, status, transaction_id, transaction_status } = req.body;
        const customer_id = await IdcodeServices.generateCode("Customer");
        const subscription = await SubscriptionService.createSubscription({ customer_id, customer_name, status, transaction_id, transaction_status });
        
        res.status(200).json({
            status: true,
            message: "Subscription created successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await SubscriptionService.getAllSubscriptions();
        res.status(200).json({
            status: true,
            message: "Subscriptions retrieved successfully",
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSubscriptionById = async (req, res, next) => {
    try {
        const { customer_id } = req.query;
        const result = await SubscriptionService.deleteSubscriptionById(customer_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Subscription not found" });
        }
        res.status(200).json({
            status: true,
            message: "Subscription deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSubscriptionById = async (req, res, next) => {
    try {
        const { customer_id } = req.query;
        const updateData = req.body;
        const updatedSubscription = await SubscriptionService.updateSubscriptionById(customer_id, updateData);
        
        if (!updatedSubscription) {
            return res.status(404).json({ status: false, message: "Subscription not found" });
        }
        
        res.status(200).json({
            status: true,
            message: "Subscription updated successfully",
            data: updatedSubscription
        });
    } catch (error) {
        next(error);
    }
};
