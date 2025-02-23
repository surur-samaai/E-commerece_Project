import {getAllSubscriptions, getSubscriptionById, getSubscriptionsByName, getSubscriptionsByDuration, addSubscription, deleteSubscription, updateSubscription} from "../Models/subscription_db.js";

const getAllSubscriptionsCon = async (req, res) => {
    try {
        res.json(await getAllSubscriptions());
    } catch (err) {
        console.log(err);
    }
}

const getSubscriptionByIdCon = async (req, res) => {
    try {
        res.json(await getSubscriptionById(req.params.subscription_id));
    } catch (err) {
        console.log(err);
    }
}

const getSubscriptionsByNameCon = async (req, res) => {
    try {
        res.json(await getSubscriptionsByName(req.params.name));
    } catch (err) {
        console.log(err);
    }
}

const getSubscriptionsByDurationCon = async (req, res) => {
    try {
        res.json(await getSubscriptionsByDuration(req.params.duration_months));
    } catch (err) {
        console.log(err);
    }
}

const addSubscriptionCon = async (req, res) => {
    try {
        await addSubscription(req.body);
        res.json({
            message:"Subscription added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteSubscriptionCon = async (req, res) => {
    try {
        await deleteSubscription(req.params.subscription_id);
        res.json({
            message:"Subscription deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateSubscriptionCon = async (req, res) => {
    try {
        await updateSubscription(req.params.subscription_id, req.body);
        res.json({
            message:"Subscription updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllSubscriptionsCon, getSubscriptionByIdCon, getSubscriptionsByNameCon, getSubscriptionsByDurationCon, addSubscriptionCon, deleteSubscriptionCon, updateSubscriptionCon};