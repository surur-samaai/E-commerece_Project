import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bcrypt());
app.use(jwt());

app.use("/workoutVideos", workoutVideosRouter);
app.use("/articles", articlesRouter);
app.use("/admin", adminRouter);
app.use("/orderItems", orderItemsRouter);
app.use("/orders", ordersRouter);
app.use("/locations", locationsRouter);
app.use("/store", storeRouter);
app.use("/users", usersRouter);
app.use("/subscription", subscriptionRouter);
app.use("/bookings", bookingRouter);
app.use("/personalTrainers", personalTrainersRouter);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
