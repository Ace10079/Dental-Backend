const SubscriptionModel = require('../Models/subscription');
const moment = require('moment');

// Create a subscription
exports.createSubscription = async (subscriptionData) => {
    const { duration } = subscriptionData;

    // Calculate expiry date using duration
    const expiryDate = moment().add(duration, 'months').toDate();

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
    // If duration is provided in the update, recalculate expiry_date
    if (updateData.duration) {
        updateData.expiry_date = moment().add(updateData.duration, 'months').toDate();
    }

    return await SubscriptionModel.findOneAndUpdate({ customer_id }, updateData, { new: true });
};
