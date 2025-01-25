import mongoose from "mongoose";
import { MONGO_URI } from "../../config.js";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}