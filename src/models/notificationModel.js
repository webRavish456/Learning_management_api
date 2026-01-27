import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllStudents",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema
);

export default NotificationModel;
