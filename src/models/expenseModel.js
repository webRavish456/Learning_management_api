import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;