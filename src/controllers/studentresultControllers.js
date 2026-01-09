import StudentresultModel from "../models/studentresultModel.js";
import AllStudentsModel from "../models/allstudentsModels.js";

// Create a new student result
export const postStudentresult = async (req, res) => {
    try {
        const { studentName, mobileNumber, resultId, courseName, marksObtained, totalMarks, passingMarks, status } = req.body;

        const existingStudent = await AllStudentsModel.findOne({ mobileNumber });
        if (!existingStudent) {
            return res.status(404).json({ status: "error", message: "Student not found in master list." });
        }

        const existingResult = await StudentresultModel.findOne({ mobileNumber });
        if (existingResult) {
            return res.status(400).json({ status: "error", message: "Result already exists for this student." });
        }

        const sheet = req.imageUrls?.image || null;

        const newResult = await StudentresultModel.create({
            studentName, courseName, marksObtained, totalMarks, 
            passingMarks, sheet, status, resultId, mobileNumber 
        });

        res.status(201).json({ status: "success", message: "Studentresult created successfully!" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// Get results by resultId
export const getStudentresult = async (req, res) => {
    try {
        const { resultId } = req.params;
        const studentresult = await StudentresultModel.find({ resultId });
        res.status(200).json({ status: "success", data: studentresult });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// Get a specific result by ID and resultId
export const getStudentresultById = async (req, res) => {
    try {
        const { id, resultId } = req.params;
        const studentresult = await StudentresultModel.findOne({ _id: id, resultId });
        if (!studentresult) {
            return res.status(404).json({ status: "error", message: "Student Result not found" });
        }
        res.status(200).json({ status: "success", data: studentresult });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// Update a student result
export const updateStudentresult = async (req, res) => {
    try {
        const { id, resultId } = req.params;
        const updateData = req.body;

        if (req.imageUrls?.image) {
            updateData.sheet = req.imageUrls.image;
        }

        const updated = await StudentresultModel.findOneAndUpdate(
            { _id: id, resultId },
            { $set: updateData },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ status: "error", message: "Student Result not found" });
        }
        res.status(200).json({ status: "success", message: "Student Result updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// ✅ ADDED: This fixes your SyntaxError/Import error
export const deleteStudentresult = async (req, res) => {
    try {
        const { id, resultId } = req.params;
        const result = await StudentresultModel.deleteOne({ _id: id, resultId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ status: "error", message: "Student Result not found" });
        }
        res.status(200).json({ status: "success", message: "Student Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};