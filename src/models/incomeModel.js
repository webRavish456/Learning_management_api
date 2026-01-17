import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Income = mongoose.model("Income", incomeSchema);
export default Income;