import {getAllOrderItems, getOrderItemById, addOrderItem, deleteOrderItem, updateOrderItem} from "../Models/orderItems_db.js";

const getAllOrderItemsCon = async (req, res) => {
    try {
        res.json(await getAllOrderItems());
    } catch (err) {
        console.log(err);
    }
}

const getOrderItemByIdCon = async (req, res) => {
    try {
        res.json(await getOrderItemById(req.params.order_item_id));
    } catch (err) {
        console.log(err);
    }
}

const addOrderItemCon = async (req, res) => {
    try {
        await addOrderItem(req.body);
        res.json({
            message:"Order item added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteOrderItemCon = async (req, res) => {
    try {
        await deleteOrderItem(req.params.order_item_id);
        res.json({
            message:"Order item deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateOrderItemCon = async (req, res) => {
    try {
        await updateOrderItem(req.params.order_item_id, req.body);
        res.json({
            message:"Order item updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllOrderItemsCon, getOrderItemByIdCon, addOrderItemCon, deleteOrderItemCon, updateOrderItemCon};
