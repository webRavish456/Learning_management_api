import leaveRequestModel from "../models/leaveRequestmodel.js";

// 🟢 Create a new leave request
export const createLeaveRequest = async (req, res) => {
  try {
    const newLeave = new leaveRequestModel(req.body);
    const savedLeave = await newLeave.save();
    res.status(201).json({ success: true, data: savedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get all leave requests
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await leaveRequestModel.find();
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get leave request by ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const leave = await leaveRequestModel.findById(req.params.id);
    if (!leave)
      return res.status(404).json({ success: false, message: "Leave not found" });
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Update a leave request
export const updateLeaveRequest = async (req, res) => {
  try {
    const updatedLeave = await leaveRequestModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLeave)
      return res.status(404).json({ success: false, message: "Leave not found" });
    res.status(200).json({ success: true, data: updatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Delete a leave request
export const deleteLeaveRequest = async (req, res) => {
  try {
    const deletedLeave = await leaveRequestModel.findByIdAndDelete(req.params.id);
    if (!deletedLeave)
      return res.status(404).json({ success: false, message: "Leave not found" });
    res.status(200).json({ success: true, message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
