import mongoose from "mongoose";

const leaveStatusSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: [true, "Profile name is required"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Leave start date is required"],
    },

    time: {
      type: Date,
      default: Date.now,
    },

    leaveDuration: {
      type: String,
      required: [true, "Leave duration is required"],
      default: "1 Day",
    },

    leaveType: {
      type: String,
      required: [true, "Leave type is required"],
      trim: true,
    },

    activity: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
    },

    attachments: {
      type: String, // stores file path
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const leaveStatusModel =
  mongoose.models.LeaveStatus ||
  mongoose.model("LeaveStatus", leaveStatusSchema);

export default leaveStatusModel;
