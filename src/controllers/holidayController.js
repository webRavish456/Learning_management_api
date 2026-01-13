import multer from "multer";
import Holiday from "../models/holidaymodel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= CREATE HOLIDAY ================= */
export const createHoliday = async (req, res) => {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res.status(400).json({
      status: "error",
      message: "Content-Type must be multipart/form-data",
    });
  }

  upload.none()(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Form data error" });
    }

    try {
      const { name, date } = req.body;

      if (!name || !date) {
        return res.status(400).json({
          status: "error",
          message: "Name and Date are required",
        });
      }

      const holidayDate = new Date(date);
      if (isNaN(holidayDate)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid date format",
        });
      }

      const existingHoliday = await Holiday.findOne({ date: holidayDate });
      if (existingHoliday) {
        return res.status(400).json({
          status: "error",
          message: "Holiday already exists on this date",
        });
      }

      const holiday = await Holiday.create({ name, date: holidayDate });

      res.status(201).json({
        status: "success",
        message: "Holiday created successfully",
        data: holiday, // ✅ _id included
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Server error" });
    }
  });
};

/* ================= GET ALL HOLIDAYS ================= */
export const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });

    res.status(200).json({
      status: "success",
      data: holidays, // ✅ each item has _id
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

/* ================= GET HOLIDAY BY ID ================= */
export const getHolidayById = async (req, res) => {
  try {
    const { id } = req.params;

    const holiday = await Holiday.findById(id);
    if (!holiday) {
      return res.status(404).json({
        status: "error",
        message: "Holiday not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: holiday, // ✅ _id included
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Invalid Holiday ID",
    });
  }
};

/* ================= UPDATE HOLIDAY ================= */
export const updateHoliday = async (req, res) => {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res.status(400).json({
      status: "error",
      message: "Content-Type must be multipart/form-data",
    });
  }

  upload.none()(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Form data error" });
    }

    try {
      const { id } = req.params;
      const { name, date } = req.body;

      let updateData = {};
      if (name) updateData.name = name;
      if (date) updateData.date = new Date(date);

      const updatedHoliday = await Holiday.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedHoliday) {
        return res.status(404).json({
          status: "error",
          message: "Holiday not found",
        });
      }

      // ✅ Only send success message
      res.status(200).json({
        status: "success",
        message: "Holiday updated successfully"
      });

    } catch (error) {
      res.status(500).json({ status: "error", message: "Server error" });
    }
  });
};


/* ================= DELETE HOLIDAY ================= */
export const deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHoliday = await Holiday.findByIdAndDelete(id);
    if (!deletedHoliday) {
      return res.status(404).json({
        status: "error",
        message: "Holiday not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Holiday deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Invalid Holiday ID",
    });
  }
};
