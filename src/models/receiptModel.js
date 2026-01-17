import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    number: {
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

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;