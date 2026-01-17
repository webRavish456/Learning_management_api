import Receipt from "../models/receiptModel.js";
import multer from "multer";

// बिना फाइल के फॉर्म-डेटा हैंडल करने के लिए
const upload = multer().none();

// 🟢 1. नई रसीद बनाएँ (Create)
export const createReceipt = async (req, res) => {
  const saveToDb = async (data) => {
    try {
      const { number, amount, date } = data;

      // वैलिडेशन
      if (!number || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Receipt number and Amount are required" 
        });
      }

      const newReceipt = await Receipt.create({
        number,
        amount: Number(amount),
        date: date || new Date(),
      });

      res.status(201).json({
        success: true,
        status: "success",
        message: "Receipt created successfully",
        data: newReceipt,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Content-Type चेक (JSON vs Form-Data)
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    upload(req, res, (err) => {
      if (err) return res.status(500).json({ success: false, message: "Multer Error" });
      saveToDb(req.body);
    });
  } else {
    saveToDb(req.body);
  }
};

// 🟢 2. सभी रसीदें प्राप्त करें (Get All)
export const getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      status: "success", 
      data: receipts 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 3. ID द्वारा रसीद प्राप्त करें (Get Single)
export const getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ success: false, message: "Receipt not found" });
    res.status(200).json({ success: true, status: "success", data: receipt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 4. रसीद अपडेट करें (Update)
export const updateReceipt = async (req, res) => {
  const updateDb = async (id, data) => {
    try {
      const updatedReceipt = await Receipt.findByIdAndUpdate(
        id, 
        { ...data, amount: data.amount ? Number(data.amount) : undefined }, 
        { new: true }
      );
      if (!updatedReceipt) return res.status(404).json({ success: false, message: "Receipt not found" });
      
      res.status(200).json({ 
        success: true, 
        status: "success", 
        message: "Receipt updated successfully", 
        data: updatedReceipt 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const { id } = req.params;
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    upload(req, res, (err) => {
      if (err) return res.status(500).json({ success: false, message: "Multer Error" });
      updateDb(id, req.body);
    });
  } else {
    updateDb(id, req.body);
  }
};

// 🟢 5. रसीद डिलीट करें (Delete)
export const deleteReceipt = async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt) return res.status(404).json({ success: false, message: "Receipt not found" });
    
    res.status(200).json({ 
      success: true, 
      status: "success", 
      message: "Receipt deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};