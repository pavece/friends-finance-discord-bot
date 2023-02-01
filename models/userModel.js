import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({ username: String, userId: Number, avatarId: String, debts: Array, oweMe: Array });

export const userModel = mongoose.models.users || model("user", userSchema);
