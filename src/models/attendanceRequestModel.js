import mongoose from "mongoose";

const attendanceRequestSchema = new mongoose.Schema(
    {
        Profile: {
            type: mongoose.Schema.Types.ObjectId,
            
            required: true,
        },
        PunchedIn: {
            type: Date,
            required: true,
        },
        PunchOut: {
            type: Date,
            required: true,
        },
        RequestType: {
            type: String,
        },
        TotalHours: {
            type: Number 
        },
        Status: {
            type: String
        },
    },
    {
        timestamps: true 
    }
);

const attendanceRequest = mongoose.model('Attendance', attendanceRequestSchema);

export default attendanceRequest;