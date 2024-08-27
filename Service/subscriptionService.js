const SubscriptionModel = require('../Models/subscription');

exports.createSubscription = async (subscriptionData) => {
    const subscription = new SubscriptionModel(subscriptionData);
    return await subscription.save();
};

exports.getAllSubscriptions = async () => {
    return await SubscriptionModel.find();
};

exports.deleteSubscriptionById = async (subscription_id) => {
    return await SubscriptionModel.findOneAndDelete({ customer_id: subscription_id });
};

exports.updateSubscriptionById = async (subscription_id, updateData) => {
    return await SubscriptionModel.findOneAndUpdate({ customer_id: subscription_id }, updateData, { new: true });
};
