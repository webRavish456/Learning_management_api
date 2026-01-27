import StudentresultModel from "../models/studentresultModel.js";
import AllStudentsModel from "../models/allstudentsModels.js";
import mongoose from "mongoose";


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


export const postStudentresult = async (req, res) => {
    try {
        const { 
            studentName, mobileNumber, resultId, courseName, 
            marksObtained, totalMarks, passingMarks, status 
        } = req.body;

        if (!studentName || !mobileNumber || !resultId || !courseName || !marksObtained || !totalMarks || !passingMarks) {
            return res.status(400).json({ 
                status: "error", 
                message: "All fields are required to create a result." 
            });
        }

       
        const existingStudent = await AllStudentsModel.findOne({ mobileNumber });
        if (!existingStudent) {
            return res.status(404).json({ 
                status: "error", 
                message: "Student not found in master list. Please check the mobile number." 
            });
        }

       
        const existingResult = await StudentresultModel.findOne({ mobileNumber, resultId });
        if (existingResult) {
            return res.status(400).json({ 
                status: "error", 
                message: "Result already exists for this student and result ID." 
            });
        }

        const sheet = req.imageUrls?.image || null;

        
        const newResult = await StudentresultModel.create({
            studentName, 
            courseName, 
            marksObtained: Number(marksObtained), 
            totalMarks: Number(totalMarks), 
            passingMarks: Number(passingMarks), 
            sheet, 
            status: status || "Active", 
            resultId, 
            mobileNumber 
        });

        return res.status(201).json({ 
            status: "success", 
            message: "Student result created successfully!", 
            data: newResult 
        });

    } catch (error) {
        console.error("Post Result Error:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const getStudentresult = async (req, res) => {
    try {
        const { resultId } = req.params;
        const studentresults = await StudentresultModel.find({ resultId }).sort({ createdAt: -1 });
        return res.status(200).json({ status: "success", data: studentresults });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const getStudentresultById = async (req, res) => {
    try {
        const { id, resultId } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }

        const studentresult = await StudentresultModel.findOne({ _id: id, resultId });
        if (!studentresult) {
            return res.status(404).json({ status: "error", message: "Student Result not found" });
        }
        return res.status(200).json({ status: "success", data: studentresult });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const updateStudentresult = async (req, res) => {
    try {
        const { id, resultId } = req.params;
        const updateData = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }

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
        return res.status(200).json({ 
            status: "success", 
            message: "Student Result updated successfully",
            data: updated
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const deleteStudentresult = async (req, res) => {
    try {
        const { id, resultId } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }

        const result = await StudentresultModel.deleteOne({ _id: id, resultId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ status: "error", message: "Student Result not found" });
        }
        return res.status(200).json({ status: "success", message: "Student Result deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};