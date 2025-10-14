import leaveStatusModel from "../models/leaveStatusmodel.js";

// 🟢 Create Leave Status
export const createLeaveStatus = async (req, res) => {
  try {
    const newLeave = new leaveStatusModel(req.body);
    const savedLeave = await newLeave.save();
    res.status(201).json({ success: true, data: savedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get All Leave Status
export const getAllLeaveStatus = async (req, res) => {
  try {
    const leaves = await leaveStatusModel.find().populate("profile");
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get Leave Status by ID
export const getLeaveStatusById = async (req, res) => {
  try {
    const leave = await leaveStatusModel.findById(req.params.id).populate("profile");
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave status not found" });
    }
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Update Leave Status
export const updateLeaveStatus = async (req, res) => {
  try {
    const updatedLeave = await leaveStatusModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLeave) {
      return res.status(404).json({ success: false, message: "Leave status not found" });
    }
    res.status(200).json({ success: true, data: updatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Delete Leave Status
export const deleteLeaveStatus = async (req, res) => {
  try {
    const deletedLeave = await leaveStatusModel.findByIdAndDelete(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ success: false, message: "Leave status not found" });
    }
    res.status(200).json({ success: true, message: "Leave status deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
