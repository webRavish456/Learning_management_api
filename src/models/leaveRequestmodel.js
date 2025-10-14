import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
    {
        profile: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        leaveType: {
            type: String,
            required: true,
        },
        attachMents: {
            type: String,
            required: true,
        },
        activity: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
    }
);

const leaveRequestmodel = mongoose.model("leaveRequest", leaveRequestSchema);

export default leaveRequestmodel;