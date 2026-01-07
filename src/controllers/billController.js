import multer from "multer";
import Bill from "../models/billModule.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ Create a new bill
export const createBill = async (req, res) => {
  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error handling form data" });
      }

      try {
        let {
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

        // Convert numeric fields
        mobileNo = mobileNo ? Number(mobileNo) : null;
        tax = tax ? Number(tax) : null;
        discount = discount ? Number(discount) : null;
        paidAmount = paidAmount ? Number(paidAmount) : null;
        dueAmount = dueAmount ? Number(dueAmount) : 0;
        totalAmount = totalAmount ? Number(totalAmount) : null;

        // Validation
        if (!studentName || !mobileNo || !admissionDate || !tax || !discount || !paidAmount || !totalAmount) {
          return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        const newBill = await Bill.create({
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
const billObj = newBill.toObject();
delete billObj._id;

res.status(201).json({
  success: true,
  message: "Bill created successfully",
  data: billObj
});
      } catch (error) {
        console.error("Error creating bill:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
      }
    });
  } else {
    res.status(400).json({ success: false, message: "Content-Type must be multipart/form-data" });
  }
};

// ✅ Get all bills
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// ✅ Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);
    if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });

    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    console.error("Error fetching bill:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// ✅ Update bill
export const updateBill = async (req, res) => {
  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error handling form data" });
      }

      try {
        const { id } = req.params;
        const updateData = req.body;

        // Convert numeric fields if present
        if (updateData.mobileNo) updateData.mobileNo = Number(updateData.mobileNo);
        if (updateData.tax) updateData.tax = Number(updateData.tax);
        if (updateData.discount) updateData.discount = Number(updateData.discount);
        if (updateData.paidAmount) updateData.paidAmount = Number(updateData.paidAmount);
        if (updateData.dueAmount) updateData.dueAmount = Number(updateData.dueAmount);
        if (updateData.totalAmount) updateData.totalAmount = Number(updateData.totalAmount);

        const updatedBill = await Bill.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBill) return res.status(404).json({ success: false, message: "Bill not found" });

        res.status(200).json({ success: true, message: "Bill updated successfully", data: updatedBill });
      } catch (error) {
        console.error("Error updating bill:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
      }
    });
  } else {
    res.status(400).json({ success: false, message: "Content-Type must be multipart/form-data" });
  }
};

// ✅ Delete bill
export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({ success: true, message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};
