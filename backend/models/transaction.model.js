import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true 
  },
  description: {
    type: String,
    require: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    require: true
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    require: true
  },
  amount: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    default: "Unknown"
  },
  date: {
    type: Date,
    require: true
  }
})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;