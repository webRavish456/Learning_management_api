import leaveStatusModel from "../models/leaveStatusModel.js";

/* ✅ CREATE LEAVE STATUS */
export const createLeaveStatus = async (req, res) => {
  try {
    // Destructuring fields from request body
    const { 
      profile, 
      date, 
      time, 
      leaveDuration, 
      leaveType, 
      activity, 
      reason, 
      attachments 
    } = req.body;

    // 1. Validation: Check if all mandatory fields are present
    if (!profile || !date || !time || !leaveDuration || !leaveType || !activity || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields (profile, date, time, duration, type, activity, reason) are required.",
      });
    }

    // 2. Database Entry
    const newStatus = await leaveStatusModel.create({
      profile,
      date: new Date(date),
      time: new Date(time),
      leaveDuration,
      leaveType,
      activity: activity || "Pending", // Default to Pending if not provided
      reason,
      attachments: attachments || null,
    });

    // 3. Response: Sending back the created object (including _id for frontend)
    res.status(201).json({
      success: true,
      message: "Leave status created successfully",
      data: newStatus,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    
    // Mongoose Validation Error Handling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message).join(", ");
      return res.status(400).json({ success: false, message: messages });
    }
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ✅ GET ALL LEAVE STATUS */
export const getAllLeaveStatus = async (req, res) => {
  try {
    // Latest leaves first (date based sorting)
    const statuses = await leaveStatusModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: statuses.length,
      data: statuses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ GET BY ID */
export const getLeaveStatusById = async (req, res) => {
  try {
    const status = await leaveStatusModel.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, data: status });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
};

/* ✅ UPDATE STATUS */
export const updateLeaveStatus = async (req, res) => {
  try {
    const updated = await leaveStatusModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ DELETE STATUS */
export const deleteLeaveStatus = async (req, res) => {
  try {
    const deleted = await leaveStatusModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};