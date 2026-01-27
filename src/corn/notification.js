import cron from "node-cron";
import NotificationModel from "../models/notificationModel.js";

const dailyNotificationJob = () => {
  cron.schedule("0 9 * * *", async () => {
    await NotificationModel.create({
      title: "Daily Reminder",
      message: "Please check today's schedule",
      type: "daily",
    });
  });
};

export default dailyNotificationJob;
