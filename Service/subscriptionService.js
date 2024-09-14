const SubscriptionModel = require('../Models/subscription');

// Create a subscription
exports.createSubscription = async (subscriptionData) => {
    // Calculate expiry date (1 year from now)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Set expiry date to one year from the current date

    // Add expiry_date to the subscription data
    const subscription = new SubscriptionModel({
        ...subscriptionData,
        expiry_date: expiryDate
    });

    return await subscription.save();
};

// Get all subscriptions
exports.getAllSubscriptions = async () => {
    return await SubscriptionModel.find();
};

// Get subscriptions by dentist_id
exports.getSubscriptionsByDentistId = async (dentist_id) => {
    return await SubscriptionModel.find({ dentist_id });
};

// Delete a subscription by customer_id
exports.deleteSubscriptionById = async (customer_id) => {
    return await SubscriptionModel.findOneAndDelete({ customer_id });
};

// Update a subscription by customer_id
exports.updateSubscriptionById = async (customer_id, updateData) => {
    return await SubscriptionModel.findOneAndUpdate({ customer_id }, updateData, { new: true });
};
