const SubscriptionService = require('../Service/subscriptionService');
const IdcodeServices = require('../Service/idcodeService');

// Create a subscription
exports.createSubscription = async (req, res, next) => {
    try {
        const { customer_name, status, transaction_id, transaction_status, dentist_id, package_name, duration } = req.body;

        // Validate required fields
        if (!customer_name || !status || !transaction_id || !transaction_status || !dentist_id || !package_name || !duration) {
            return res.status(400).json({ 
                status: false, 
                message: "All fields (customer_name, status, transaction_id, transaction_status, dentist_id, package_name, duration) are required." 
            });
        }

        // Generate a unique customer_id
        const customer_id = await IdcodeServices.generateCode("Customer");

        const subscriptionData = {
            customer_id,
            customer_name,
            status,
            transaction_id,
            transaction_status,
            dentist_id,
            package_name,
            duration
        };

        // Call the service to create the subscription
        const subscription = await SubscriptionService.createSubscription(subscriptionData);

        res.status(200).json({
            status: true,
            message: "Subscription created successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

// Get all subscriptions
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

// Get subscriptions by dentist_id
exports.getSubscriptionsByDentistId = async (req, res, next) => {
    try {
        const { dentist_id } = req.query;
        const subscriptions = await SubscriptionService.getSubscriptionsByDentistId(dentist_id);

        if (subscriptions.length === 0) {
            return res.status(404).json({ status: false, message: "No subscriptions found for this dentist" });
        }

        res.status(200).json({
            status: true,
            message: "Subscriptions retrieved successfully",
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

// Delete a subscription by customer_id
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

// Update a subscription by customer_id
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
