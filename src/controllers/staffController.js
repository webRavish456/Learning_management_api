import mongoose from "mongoose";
import StaffModel from "../models/staffmodel.js";

// Utility function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ============================
   ✅ Create new Staff
============================ */
export const createStaff = async (req, res) => {
  try {
    const { staffName, email, mobileNO, designation, address, salary, joiningDate } = req.body;

    // 1️⃣ Validation - check all required fields
    if (!staffName || !email || !mobileNO || !designation || !address || !salary || !joiningDate) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    // 2️⃣ Check if email already exists
    const existingStaff = await StaffModel.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({ status: "error", message: "Email already registered" });
    }

    // 3️⃣ Create new staff entry
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
    console.error("Error creating staff:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================
   ✅ Get all Staff Members
============================ */
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await StaffModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data: staffList,
    });
  } catch (error) {
    console.error("Error fetching staff list:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================
   ✅ Get Single Staff by ID
============================ */
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: "error", message: "Invalid Staff ID" });
    }

    const staff = await StaffModel.findById(id);
    if (!staff) {
      return res.status(404).json({ status: "error", message: "Staff member not found" });
    }

    return res.status(200).json({
      status: "success",
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================
   ✅ Update Staff Details
============================ */
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: "error", message: "Invalid Staff ID" });
    }

    // Email conflict check
    if (updateData.email) {
      const existing = await StaffModel.findOne({
        email: updateData.email,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({ status: "error", message: "Email already in use by another staff" });
      }
    }

    const updatedStaff = await StaffModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    if (!updatedStaff) {
      return res.status(404).json({ status: "error", message: "Staff member not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Staff details updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================
   ✅ Delete Staff Member
============================ */
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: "error", message: "Invalid Staff ID" });
    }

    const deletedStaff = await StaffModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ status: "error", message: "Staff member not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
