import Attendance from "../models/attendanceDetails.js";

// ✅ Create (Mark Attendance)
export const markAttendance = async (req, res) => {
  try {
    const { user, date, status, checkInTime, checkOutTime, notes } = req.body;

    const newAttendance = new Attendance({
      user,
      date,
      status,
      checkInTime,
      checkOutTime,
      notes,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: savedAttendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Get All Attendance Records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("user", "name email");
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching records", error });
  }
};

// ✅ Get Attendance by User ID
export const getAttendanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await Attendance.find({ user: userId }).populate("user", "name email");
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user attendance", error });
  }
};

// ✅ Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating attendance", error });
  }
};

// ✅ Delete Attendance Record
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Attendance.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({ success: true, message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting attendance", error });
  }
};
