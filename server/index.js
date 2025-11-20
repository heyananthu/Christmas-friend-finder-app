import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import connectDB from "./lib/db.js";
import path from 'path';

dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/employees", employeeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/chatapp/dist')));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/chatapp/dist/index.html'));
  });

}

app.listen(5000, () => console.log("Server running on port 5000"));
