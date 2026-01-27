import Attendance from "../models/attendenceRequestModel.js";

/* CREATE */
export const createAttendance = async (req, res) => {
  try {
    const { employee, punchIn, punchOut, note } = req.body;

    if (!employee || !punchIn || !punchOut) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const attendance = await Attendance.create({
      employee,
      punchIn,
      punchOut,
      note,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance saved successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("CREATE ATTENDANCE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving attendance",
    });
  }
};

/* GET ALL */
export const getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* GET BY ID */
export const getAttendanceById = async (req, res) => {
  try {
    const data = await Attendance.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* UPDATE */
export const updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* DELETE */
export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
