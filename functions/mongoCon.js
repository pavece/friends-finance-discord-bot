import mongoose from "mongoose";

import dotenv from "dotenv";
import { error, success } from "../utils/logger.js";
dotenv.config();

export const mongoDbCon = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_CON_URL);
    success("Connected to database");
  } catch (e) {
    error(e);
  }
};
