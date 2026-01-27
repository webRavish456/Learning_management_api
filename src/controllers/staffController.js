import mongoose from "mongoose";
import StaffModel from "../models/staffmodel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ================= CREATE STAFF ================= */
const createStaff = async (req, res) => {
  try {
    const {
      staffName,
      email,
      mobileNO,
      designation,
      address,
      salary,
      joiningDate,
    } = req.body;

    // ✅ CORRECT VALIDATION
    if (
      !staffName ||
      !email ||
      !mobileNO ||
      !designation ||
      !address ||
      salary === undefined ||
      !joiningDate
    ) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be filled",
      });
    }

    // ✅ UNIQUE EMAIL CHECK
    const existingStaff = await StaffModel.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({
        status: "error",
        message: "Email already registered",
      });
    }

    // ✅ CREATE STAFF
    const newStaff = await StaffModel.create({
      staffName,
      email,
      mobileNO,
      designation,
      address,
      salary,
      joiningDate,
    });

    return res.status(201).json({
      status: "success",
      message: "Staff member added successfully!",
      data: newStaff,
    });
  } catch (error) {
    console.error("Create Staff Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET ALL STAFF ================= */
const getAllStaff = async (req, res) => {
  try {
    const staffList = await StaffModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data: staffList,
    });
  } catch (error) {
    console.error("Get All Staff Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/* ================= GET STAFF BY ID ================= */
const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Staff ID",
      });
    }

    const staff = await StaffModel.findById(id);
    if (!staff) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: staff,
    });
  } catch (error) {
    console.error("Get Staff By ID Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/* ================= UPDATE STAFF ================= */
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Staff ID",
      });
    }

    if (updateData.email) {
      const existing = await StaffModel.findOne({
        email: updateData.email,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({
          status: "error",
          message: "Email already in use by another staff",
        });
      }
    }

    const updatedStaff = await StaffModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Staff details updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Update Staff Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/* ================= DELETE STAFF ================= */
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Staff ID",
      });
    }

    const deletedStaff = await StaffModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error("Delete Staff Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
