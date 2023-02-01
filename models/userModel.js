import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  userId: Number,
  avatarId: String,
  debts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Debt" }],
  oweMe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Debt" }],
});

export const userModel = mongoose.models.users || model("User", userSchema);
