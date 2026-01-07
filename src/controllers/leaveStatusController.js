import leaveStatusModel from "../models/leaveStatusModel.js";

/* CREATE LEAVE STATUS */
export const createLeaveStatus = async (req, res) => {
  try {
    const { profile, date, time, leaveDuration, leaveType, activity, attachments } = req.body;

    if (!profile || !date || !time || !leaveDuration || !leaveType || !activity) {
      return res.status(400).json({
        success: false,
        message: "All fields except attachments are required",
      });
    }

    const newStatus = await leaveStatusModel.create({
      profile,
      date: new Date(date),
      time: new Date(time),
      leaveDuration,
      leaveType,
      activity,
      attachments: attachments || null,
    });

    const { _id, __v, ...statusData } = newStatus.toObject();

    res.status(201).json({
      success: true,
      message: "Leave status created successfully",
      data: statusData,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message).join(", ");
      return res.status(400).json({ success: false, message: messages });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET ALL LEAVE STATUS */
export const getAllLeaveStatus = async (req, res) => {
  try {
    const statuses = await leaveStatusModel.find().sort({ date: -1 });
    const data = statuses.map((status) => {
      const { _id, __v, ...statusData } = status.toObject();
      return statusData;
    });

    res.status(200).json({
      success: true,
      message: "All leave statuses fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET BY ID */
export const getLeaveStatusById = async (req, res) => {
  try {
    const status = await leaveStatusModel.findById(req.params.id);
    if (!status) return res.status(404).json({ success: false, message: "Leave status not found" });

    const { _id, __v, ...statusData } = status.toObject();
    res.status(200).json({ success: true, message: "Leave status fetched successfully", data: statusData });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid leave status ID" });
  }
};

/* UPDATE */
export const updateLeaveStatus = async (req, res) => {
  try {
    const updated = await leaveStatusModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Leave status not found" });

    const { _id, __v, ...statusData } = updated.toObject();
    res.status(200).json({ success: true, message: "Leave status updated successfully", data: statusData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE */
export const deleteLeaveStatus = async (req, res) => {
  try {
    const deleted = await leaveStatusModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Leave status not found" });

    res.status(200).json({ success: true, message: "Leave status deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid leave status ID" });
  }
};
