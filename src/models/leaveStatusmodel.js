import mongoose from "mongoose";

const leaveStatusSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: Date,
      required: true,
    },

    leaveDuration: {
      type: Number,
      required: true,
    },

    leaveType: {
      type: Number,
      required: true,
    },

    attachments: {
      type: String,
      required: false,
    },

    activity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const leaveStatusModel = mongoose.model("LeaveStatus", leaveStatusSchema);

export default leaveStatusModel;
