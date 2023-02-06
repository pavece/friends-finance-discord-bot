import mongoose from "mongoose";
import { error, success } from "../utils/logger.js";

export const mongoDbCon = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_CON_URL);
    success("Connected to database");
  } catch (e) {
    error(e);
  }
};
