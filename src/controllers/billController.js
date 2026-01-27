import Bill from "../models/billModule.js";


export const createBill = async (req, res) => {
  try {
    const { 
      studentName, mobileNo, courseAsssigned, admissionDate, 
      tax, discount, paidAmount, totalAmount, status 
    } = req.body;

    
    const calculatedDue = Number(totalAmount || 0) - Number(paidAmount || 0);

    const newBill = await Bill.create({
      studentName,
      mobileNo: Number(mobileNo),
      courseAsssigned,
      admissionDate,
      tax: Number(tax || 0),
      discount: Number(discount || 0),
      paidAmount: Number(paidAmount || 0),
      totalAmount: Number(totalAmount || 0),
      dueAmount: calculatedDue,
      status: status || "Pending"
    });

    res.status(201).json({
      success: true,
      status: "success",
      message: "Bill created successfully",
      data: newBill
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      status: "success", 
      data: bills 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);
    if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });
    
    res.status(200).json({ 
      success: true, 
      status: "success", 
      data: bill 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

   
    if (updateData.totalAmount) updateData.totalAmount = Number(updateData.totalAmount);
    if (updateData.paidAmount) updateData.paidAmount = Number(updateData.paidAmount);
    
  
    if (updateData.totalAmount !== undefined || updateData.paidAmount !== undefined) {
        const currentBill = await Bill.findById(id);
        const total = updateData.totalAmount ?? currentBill.totalAmount;
        const paid = updateData.paidAmount ?? currentBill.paidAmount;
        updateData.dueAmount = Number(total) - Number(paid);
    }

    const updatedBill = await Bill.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedBill) return res.status(404).json({ success: false, message: "Bill not found" });
    
    res.status(200).json({ 
      success: true, 
      status: "success", 
      message: "Bill updated successfully", 
      data: updatedBill 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);
    
    if (!deletedBill) return res.status(404).json({ success: false, message: "Bill not found" });
    
    res.status(200).json({ 
      success: true, 
      status: "success", 
      message: "Bill deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};