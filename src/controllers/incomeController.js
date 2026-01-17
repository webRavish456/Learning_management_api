import Income from "../models/incomeModel.js";
import multer from "multer";

const upload = multer().none();

// 🟢 1. Create Income
export const createIncome = async (req, res) => {
    const saveToDb = async (data) => {
        try {
            const { source, amount, date } = data;

            if (!source || !amount) {
                return res.status(400).json({ success: false, message: "Source and Amount are required" });
            }

            const newIncome = await Income.create({
                source,
                amount: Number(amount),
                date: date || new Date(),
            });

            res.status(201).json({ success: true, status: "success", data: newIncome });
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

// 🟢 2. Get All Incomes
export const getAllIncomes = async (req, res) => {
    try {
        const data = await Income.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, status: "success", data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🟢 3. Update Income
export const updateIncome = async (req, res) => {
    try {
        const updated = await Income.findByIdAndUpdate(
            req.params.id,
            { ...req.body, amount: req.body.amount ? Number(req.body.amount) : undefined },
            { new: true }
        );
        res.status(200).json({ success: true, status: "success", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🟢 4. Delete Income
export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, status: "success", message: "Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🟢 5. Get Single Income (Optional but good for View)
export const getIncomeById = async (req, res) => {
    try {
        const data = await Income.findById(req.params.id);
        res.status(200).json({ success: true, status: "success", data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};