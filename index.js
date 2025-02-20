import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bcrypt());
app.use(jwt());

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
  });



  const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}');
  });