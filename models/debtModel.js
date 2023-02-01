import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
  amount: Number,
  concept: String,
  date: String,
  filled: Boolean,
  debtId: { type: String, index: true },
  to: String,
  from: String,
});

export const debtModel =
  mongoose.models.debts || new mongoose.model("Debt", debtSchema);
