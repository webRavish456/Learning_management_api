import NotificationModel from "../models/notificationModel.js";

/* ================= CREATE ================= */
export const createNotification = async (req, res) => {
  try {
    const notification = await NotificationModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create notification",
    });
  }
};

/* ================= GET ALL ================= */
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch notifications",
    });
  }
};

/* ================= GET BY ID ================= */
export const getNotificationById = async (req, res) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: notification,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Notification not found",
    });
  }
};

/* ================= UPDATE ================= */
export const updateNotification = async (req, res) => {
  try {
    const updated = await NotificationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update notification",
    });
  }
};

/* ================= DELETE ================= */
export const deleteNotification = async (req, res) => {
  try {
    await NotificationModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete notification",
    });
  }
};

/* ================= MARK AS READ ================= */
export const markAsRead = async (req, res) => {
  try {
    const updated = await NotificationModel.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to mark as read",
    });
  }
};
