import DailyLog from "../models/dailyLog.js";

// ✅ Create a new daily log entry
export const createDailyLog = async (req, res) => {
  try {
    const { profile, punchedIn, punchedOut, behavior, breakTime, entry } = req.body;

    // Validate required fields
    if (!profile || !punchedIn) {
      return res.status(400).json({
        success: false,
        message: "Profile and Punched In time are required",
      });
    }

    // Auto-calculate total hours if punchedOut is provided
    let totalHours = 0;
    if (punchedOut) {
      const diffMs = new Date(punchedOut) - new Date(punchedIn);
      totalHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
      totalHours = parseFloat(totalHours.toFixed(2));
    }

    const newLog = new DailyLog({
      profile,
      punchedIn,
      punchedOut,
      behavior,
      breakTime: breakTime || 0,
      totalHours,
      entry: entry || "Automatic",
    });

    const savedLog = await newLog.save();

    res.status(201).json({
      success: true,
      message: "Daily log created successfully",
      data: savedLog,
    });
  } catch (error) {
    console.error("Error creating daily log:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ✅ Get all daily logs
export const getAllDailyLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching daily logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching daily logs",
      error,
    });
  }
};

// ✅ Get daily log by ID
export const getDailyLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await DailyLog.findById(id);

    if (!log) {
      return res.status(404).json({ success: false, message: "Log not found" });
    }

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching daily log:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching daily log",
      error,
    });
  }
};

// ✅ Update daily log
export const updateDailyLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { punchedIn, punchedOut, behavior, breakTime, entry } = req.body;

    // Calculate total hours if both times are available
    let totalHours = 0;
    if (punchedIn && punchedOut) {
      const diffMs = new Date(punchedOut) - new Date(punchedIn);
      totalHours = diffMs / (1000 * 60 * 60);
      totalHours = parseFloat(totalHours.toFixed(2));
    }

    const updatedLog = await DailyLog.findByIdAndUpdate(
      id,
      {
        ...req.body,
        totalHours,
      },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ success: false, message: "Log not found" });
    }

    res.status(200).json({
      success: true,
      message: "Daily log updated successfully",
      data: updatedLog,
    });
  } catch (error) {
    console.error("Error updating daily log:", error);
    res.status(500).json({
      success: false,
      message: "Error updating daily log",
      error,
    });
  }
};

// ✅ Delete daily log
export const deleteDailyLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLog = await DailyLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ success: false, message: "Log not found" });
    }

    res.status(200).json({
      success: true,
      message: "Daily log deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting daily log:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting daily log",
      error,
    });
  }
};
