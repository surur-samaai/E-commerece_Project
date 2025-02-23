import {getAllBookings, getBookingById, getBookingsByDate, getBookingsByTime, getBookingsByStatus, getBookingByUserId, getBookingByTrainerId, addBooking, deleteBooking, updateBooking} from "../Models/bookings_db.js";

const getAllBookingsCon = async (req, res) => {
    try {
        res.json(await getAllBookings());
    } catch (err) {
        console.log(err);
    }
}

const getBookingByIdCon = async (req, res) => {
    try {
        res.json(await getBookingById(req.params.booking_id));
    } catch (err) {
        console.log(err);
    }
}

const getBookingsByDate = async (req, res) => {
    try {
        res.json(await getBookingsByDate(req.params.date));
    } catch (err) {
        console.log(err);
    }
}

const getBookingsByTime = async (req, res) => {
    try {
        res.json(await getBookingsByTime(req.params.time));
    } catch (err) {
        console.log(err);
    }
}

const getBookingsByStatus = async (req, res) => {
    try {
        res.json(await getBookingsByStatus(req.params.status));
    } catch (err) {
        console.log(err);
    }
}

const getBookingByUserIdCon = async (req, res) => {
    try {
        res.json(await getBookingByUserId(req.params.user_id));
    } catch (err) {
        console.log(err);
    }
}

const getBookingByTrainerIdCon = async (req, res) => {
    try {
        res.json(await getBookingByTrainerId(req.params.trainer_id));
    } catch (err) {
        console.log(err);
    }
}

const addBookingCon = async (req, res) => {
    try {
        await addBooking(req.body);
        res.json({
            message:"Booking added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteBookingCon = async (req, res) => {
    try {
        await deleteBooking(req.params.booking_id);
        res.json({
            message:"Booking deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateBookingCon = async (req, res) => {
    try {
        await updateBooking(req.params.booking_id, req.body);
        res.json({
            message:"Booking updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllBookingsCon, getBookingByIdCon, getBookingsByDate, getBookingsByTime, getBookingsByStatus, getBookingByUserIdCon, getBookingByTrainerIdCon, addBookingCon, deleteBookingCon, updateBookingCon};
