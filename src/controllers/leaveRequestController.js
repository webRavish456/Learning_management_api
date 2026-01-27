import multer from "multer";
import leaveRequestModel from "../models/leaveRequestmodel.js";


const storage = multer.memoryStorage();
const upload = multer({ storage });


export const createLeaveRequest = async (req, res) => {
  upload.single("attachMents")(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "File upload error" });

    try {
      const { profile, startDate, leaveType, activity, reason } = req.body;
      const attachMents = req.file ? req.file.originalname : req.body.attachMents || "";

    
      if (!profile || !startDate || !leaveType || !activity || !reason) {
        return res.status(400).json({ success: false, message: "All fields except attachment are required" });
      }

      const newLeave = await leaveRequestModel.create({
        profile,
        startDate: new Date(startDate),
        leaveType,
        attachMents,
        activity,
        reason,
      });

      const { _id, __v, ...leaveData } = newLeave.toObject();

      res.status(201).json({
        success: true,
        message: "Leave request created successfully",
        data: leaveData,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(val => val.message).join(", ");
        return res.status(400).json({ success: false, message: messages });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await leaveRequestModel.find().sort({ startDate: -1 });
    const data = leaves.map(l => {
      const { _id, __v, ...leaveData } = l.toObject();
      return leaveData;
    });
    res.status(200).json({ success: true, message: "All leave requests fetched successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getLeaveRequestById = async (req, res) => {
  try {
    const leave = await leaveRequestModel.findById(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: "Leave request not found" });

    const { _id, __v, ...leaveData } = leave.toObject();
    res.status(200).json({ success: true, message: "Leave request fetched successfully", data: leaveData });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid leave request ID" });
  }
};


export const updateLeaveRequest = async (req, res) => {
  upload.single("attachMents")(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "File upload error" });

    try {
      const updatedData = { ...req.body };
      if (req.file) updatedData.attachMents = req.file.originalname;

      const updatedLeave = await leaveRequestModel.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
      if (!updatedLeave) return res.status(404).json({ success: false, message: "Leave request not found" });

      const { _id, __v, ...leaveData } = updatedLeave.toObject();
      res.status(200).json({ success: true, message: "Leave request updated successfully", data: leaveData });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(val => val.message).join(", ");
        return res.status(400).json({ success: false, message: messages });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  });
};


export const deleteLeaveRequest = async (req, res) => {
  try {
    const deletedLeave = await leaveRequestModel.findByIdAndDelete(req.params.id);
    if (!deletedLeave) return res.status(404).json({ success: false, message: "Leave request not found" });

    res.status(200).json({ success: true, message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid leave request ID" });
  }
};
