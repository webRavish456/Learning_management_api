import Holiday from "../models/holidaymodel.js";

// ✅ Create a new holiday
export const createHoliday = async (req, res) => {
  try {
    const { name, date } = req.body;

    // Validate inputs
    if (!name || !date) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Date are required" });
    }

    // Check if holiday already exists on the same date
    const existingHoliday = await Holiday.findOne({ date });
    if (existingHoliday) {
      return res.status(400).json({
        success: false,
        message: "A holiday already exists on this date",
      });
    }

    const newHoliday = new Holiday({ name, date });
    const savedHoliday = await newHoliday.save();

    res.status(201).json({
      success: true,
      message: "Holiday created successfully",
      data: savedHoliday,
    });
  } catch (error) {
    console.error("Error creating holiday:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

// ✅ Get all holidays
export const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 }); // sort by date ascending
    res.status(200).json({ success: true, data: holidays });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching holidays",
      error,
    });
  }
};

// ✅ Get holiday by ID
export const getHolidayById = async (req, res) => {
  try {
    const { id } = req.params;
    const holiday = await Holiday.findById(id);

    if (!holiday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }

    res.status(200).json({ success: true, data: holiday });
  } catch (error) {
    console.error("Error fetching holiday:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching holiday",
      error,
    });
  }
};

// ✅ Update holiday
export const updateHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;

    // Prevent duplicate dates
    if (date) {
      const existingHoliday = await Holiday.findOne({
        _id: { $ne: id },
        date,
      });
      if (existingHoliday) {
        return res.status(400).json({
          success: false,
          message: "A holiday already exists on this date",
        });
      }
    }

    const updatedHoliday = await Holiday.findByIdAndUpdate(
      id,
      { name, date },
      { new: true }
    );

    if (!updatedHoliday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }

    res.status(200).json({
      success: true,
      message: "Holiday updated successfully",
      data: updatedHoliday,
    });
  } catch (error) {
    console.error("Error updating holiday:", error);
    res.status(500).json({
      success: false,
      message: "Error updating holiday",
      error,
    });
  }
};

// ✅ Delete holiday
export const deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHoliday = await Holiday.findByIdAndDelete(id);

    if (!deletedHoliday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }

    res.status(200).json({
      success: true,
      message: "Holiday deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting holiday:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting holiday",
      error,
    });
  }
};
