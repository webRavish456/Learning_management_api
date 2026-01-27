import mongoose from "mongoose";

const attendenceRequestSchema = new mongoose.Schema(
  {
    employee: { type: String, required: true },
    punchIn: { type: String, required: true },
    punchOut: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model(
  "AttendanceRequest",
  attendenceRequestSchema
);
