import {getAllOrders, getOrderById, getOrderByUserId, getOrderByOrderDate, addOrder, deleteOrder, updateOrder} from "../Models/orders_db.js";

const getAllOrdersCon = async (req, res) => {
    try {
        res.json(await getAllOrders());
    } catch (err) {
        console.log(err);
    }
}

const getOrderByIdCon = async (req, res) => {
    try {
        res.json(await getOrderById(req.params.order_id));
    } catch (err) {
        console.log(err);
    }
}

const getOrderByUserIdCon = async (req, res) => {
    try {
        res.json(await getOrderByUserId(req.params.user_id));
    } catch (err) {
        console.log(err);
    }
}

const getOrderByOrderDateCon = async (req, res) => {
    try {
        res.json(await getOrderByOrderDate(req.params.order_date));
    } catch (err) {
        console.log(err);
    }
}

const addOrderCon = async (req, res) => {
    try {
        await addOrder(req.body);
        res.json({
            message:"Order added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteOrderCon = async (req, res) => {
    try {
        await deleteOrder(req.params.order_id);
        res.json({
            message:"Order deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateOrderCon = async (req, res) => {
    try {
        await updateOrder(req.params.order_id, req.body);
        res.json({
            message:"Order updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllOrdersCon, getOrderByIdCon, getOrderByUserIdCon, getOrderByOrderDateCon, addOrderCon, deleteOrderCon, updateOrderCon}; 
