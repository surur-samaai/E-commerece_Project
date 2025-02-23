import express from "express";
import {getAllBookingsCon, getBookingByIdCon, getBookingsByDate, getBookingsByTime, getBookingsByStatus, getBookingByUserIdCon, getBookingByTrainerIdCon, addBookingCon, deleteBookingCon, updateBookingCon} from "../controls/bookingsController.js";

const router = express.Router();

router.get("/", getAllBookingsCon);

router.get("/:booking_id", getBookingByIdCon);

router.get("/date/:date", getBookingsByDate);

router.get("/time/:time", getBookingsByTime);

router.get("/status/:status", getBookingsByStatus);

router.get("/user/:user_id", getBookingByUserIdCon);    

router.get("/trainer/:trainer_id", getBookingByTrainerIdCon);

router.post("/", addBookingCon);

router.delete("/:booking_id", deleteBookingCon);

router.patch("/:booking_id", updateBookingCon);

export default router;