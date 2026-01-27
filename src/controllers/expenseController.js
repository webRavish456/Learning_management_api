import Expense from "../models/expenseModel.js"; 
import multer from "multer";

const upload = multer().none();


export const createExpense = async (req, res) => {
  const saveToDb = async (data) => {
    try {
      const { item, cost, date } = data;

     
      if (!item || !cost) {
        return res.status(400).json({ 
          success: false, 
          message: "Item name and Cost are required" 
        });
      }

      const newExpense = await Expense.create({
        item,
        cost: Number(cost),
        date: date || new Date(),
      });

      res.status(201).json({
        success: true,
        status: "success",
        message: "Expense added successfully",
        data: newExpense,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  
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


export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      status: "success", 
      data: expenses 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    res.status(200).json({ success: true, status: "success", data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateExpense = async (req, res) => {
  const updateDb = async (id, data) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id, 
        { ...data, cost: data.cost ? Number(data.cost) : undefined }, 
        { new: true }
      );
      if (!updatedExpense) return res.status(404).json({ success: false, message: "Expense not found" });
      
      res.status(200).json({ 
        success: true, 
        status: "success", 
        message: "Expense updated", 
        data: updatedExpense 
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


export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ success: false, message: "Expense not found" });
    
    res.status(200).json({ 
      success: true, 
      status: "success", 
      message: "Expense deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};