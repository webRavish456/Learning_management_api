import Bill from "../models/billModule.js";

// ✅ Create a new bill
export const createBill = async (req, res) => {
  try {
    const {
      studentName,
      mobileNo,
      courseAsssigned,
      admissionDate,
      tax,
      discount,
      paidAmount,
      dueAmount,
      totalAmount,
      status,
    } = req.body;

    // Validation
    if (
      !studentName ||
      !mobileNo ||
      !admissionDate ||
      !tax ||
      !discount ||
      !paidAmount ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Create new bill
    const newBill = new Bill({
      studentName,
      mobileNo,
      courseAsssigned,
      admissionDate,
      tax,
      discount,
      paidAmount,
      dueAmount,
      totalAmount,
      status,
    });

    const savedBill = await newBill.save();
    res.status(201).json({
      success: true,
      message: "Bill created successfully",
      data: savedBill,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ✅ Get all bills
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bills",
      error,
    });
  }
};

// ✅ Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);

    if (!bill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bill",
      error,
    });
  }
};

// ✅ Update bill
export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBill = await Bill.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bill updated successfully",
      data: updatedBill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating bill",
      error,
    });
  }
};

// ✅ Delete bill
export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting bill",
      error,
    });
  }
};
