import mongoose from "mongoose";

const leaveStatusSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: [true, "Profile name is required"], // User ka naam (e.g., Arjun)
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    time: {
      type: Date,
      required: [true, "Time is required"],
      default: Date.now,
    },
    leaveDuration: {
      type: String,
      required: [true, "Leave duration is required"], // e.g., "2 Days"
    },
    leaveType: {
      type: String,
      required: [true, "Leave type is required"], // e.g., "Sick", "Casual"
    },
    activity: {
      type: String,
      required: [true, "Activity status is required"],
      enum: ["Pending", "Approved", "Rejected"], // Sirf yahi options allow honge
      default: "Pending",
    },
    reason: {
      type: String,
      required: [true, "Reason for leave is required"], // Form ka 'reason' field
    },
    attachments: {
      type: String, // PDF link ya image path ke liye
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const leaveStatusModel = mongoose.models.LeaveStatus || mongoose.model("LeaveStatus", leaveStatusSchema);

export default leaveStatusModel;