import Notification from "../models/notificationModel.js";
import nodemailer from "nodemailer";

// ✅ 1️⃣ Create Notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, type, recipient, scheduledTime } = req.body;

    const newNotification = new Notification({
      title,
      message,
      type,
      recipient,
      scheduledTime,
    });

    await newNotification.save();

    // ✅ Email भेजने का logic (optional)
    if (type === "email") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your_email@gmail.com", // 👈 अपनी email डालो
          pass: "your_app_password", // 👈 Gmail App Password डालना
        },
      });

      const mailOptions = {
        from: "your_email@gmail.com",
        to: recipient,
        subject: title,
        text: message,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({
      success: true,
      message: "Notification created successfully!",
      data: newNotification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2️⃣ Get All Notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3️⃣ Get Notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 4️⃣ Update Notification
export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!notification)
      return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({
      success: true,
      message: "Notification updated successfully!",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 5️⃣ Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
