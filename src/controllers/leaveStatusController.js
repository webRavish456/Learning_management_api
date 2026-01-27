import leaveStatusModel from "../models/leaveStatusModel.js";

/* ===============================
   CREATE LEAVE STATUS
================================ */
export const createLeaveStatus = async (req, res) => {
  try {
    const { profile, date, leaveType, reason, activity, leaveDuration } =
      req.body;

    if (!profile || !date || !leaveType || !reason) {
      return res.status(400).json({
        success: false,
        message: "Profile, date, leave type and reason are required",
      });
    }

    const newLeave = await leaveStatusModel.create({
      profile,
      date: new Date(date),
      time: new Date(),
      leaveDuration: leaveDuration || "1 Day",
      leaveType,
      activity: activity || "Pending",
      reason,
      attachments: req.file ? req.file.path : null,
    });

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: newLeave,
    });
  } catch (error) {
    console.error("Create Leave Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ===============================
   GET ALL LEAVE STATUS
================================ */
export const getAllLeaveStatus = async (req, res) => {
  try {
    const leaves = await leaveStatusModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leave records",
    });
  }
};

/* ===============================
   GET LEAVE BY ID
================================ */
export const getLeaveStatusById = async (req, res) => {
  try {
    const leave = await leaveStatusModel.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid leave ID",
    });
  }
};

/* ===============================
   UPDATE LEAVE STATUS
================================ */
export const updateLeaveStatus = async (req, res) => {
  try {
    const updatedLeave = await leaveStatusModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      data: updatedLeave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* ===============================
   DELETE LEAVE STATUS
================================ */
export const deleteLeaveStatus = async (req, res) => {
  try {
    const deletedLeave = await leaveStatusModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedLeave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid leave ID",
    });
  }
};
