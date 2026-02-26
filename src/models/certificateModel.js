import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    StudentName: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    Duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
