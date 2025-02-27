import express from "express";
import {getAllBookingsCon, getBookingByIdCon, addBookingCon, deleteBookingCon, updateBookingCon} from "../controls/bookingsController.js";

const router = express.Router();

router.get("/", getAllBookingsCon);

router.get("/:booking_id", getBookingByIdCon);

// router.get("/date/:date", getBookingsByDateCon);

// router.get("/time/:time", getBookingsByTimeCon);

// router.get("/status/:status", getBookingsByStatusCon);

// router.get("/user/:user_id", getBookingByUserIdCon);    

// router.get("/trainer/:trainer_id", getBookingByTrainerIdCon);

router.post("/", addBookingCon);

router.delete("/:booking_id", deleteBookingCon);

router.patch("/:booking_id", updateBookingCon);

export default router;