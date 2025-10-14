
import Attendance from '../models/attendanceModule.js'; 

export const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET All Attendance
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceList = await Attendance.find();
    res.status(200).json(attendanceList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Attendance By ID
export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Attendance
export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE Attendance
export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
