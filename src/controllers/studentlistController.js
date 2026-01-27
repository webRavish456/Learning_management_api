import AllStudentsModel from "../models/allstudentsModels.js";
import mongoose from "mongoose";


export const postAllStudents = async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const { 
            studentName, emailId, mobileNumber, dob, 
            gender, address, enrollmentDate, course, status 
        } = req.body;

       
        if (!studentName || !emailId || !mobileNumber || !course) {
            return res.status(400).json({ 
                status: "error", 
                message: "Missing required fields: Name, Email, Mobile, or Course." 
            });
        }

      
        const normalizedEmail = emailId.toLowerCase().trim();
        const existingStudent = await AllStudentsModel.findOne({ emailId: normalizedEmail });
        
        if (existingStudent) {
            return res.status(409).json({ 
                status: "error", 
                message: "Email ID already exists. Please use a different one." 
            });
        }

        const newStudent = await AllStudentsModel.create({
            studentName,
            emailId: normalizedEmail,
            mobileNumber,
            dob,
            gender,
            address,
            enrollmentDate,
            course,
            status: status || "Ongoing"
        });

       
        return res.status(201).json({
            status: "success",
            message: "Student record created successfully!",
            data: newStudent
        });

    } catch (error) {
        console.error("Create Student Error:", error);
        return res.status(500).json({ 
            status: "error", 
            message: error.name === 'ValidationError' ? "Database Validation Failed" : "Internal Server Error" 
        });
    }
};

export const getAllStudents = async (req, res) => {
    try {
       
        const students = await AllStudentsModel.find().sort({ createdAt: -1 }).lean();
        
        return res.status(200).json({
            status: "success",
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error("Get All Students Error:", error);
        return res.status(500).json({ status: "error", message: "Failed to fetch student list" });
    }
};


export const getAllStudentsById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }

        const student = await AllStudentsModel.findById(id).lean();
        
        if (!student) {
            return res.status(404).json({ status: "error", message: "Student record not found" });
        }

        return res.status(200).json({ status: "success", data: student });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server error while fetching student details" });
    }
};

export const updateAllStudents = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID provided for update" });
        }

      
        if (req.body.emailId) {
            const normalizedEmail = req.body.emailId.toLowerCase().trim();
            const emailInUse = await AllStudentsModel.findOne({ 
                emailId: normalizedEmail, 
                _id: { $ne: id } 
            });
            if (emailInUse) {
                return res.status(409).json({ status: "error", message: "Email is already taken by another student" });
            }
            req.body.emailId = normalizedEmail;
        }

        const updatedStudent = await AllStudentsModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ status: "error", message: "Student record not found" });
        }

        return res.status(200).json({
            status: "success",
            message: "Student record updated successfully",
            data: updatedStudent
        });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ status: "error", message: "Failed to update record" });
    }
};


export const deleteAllStudents = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID provided for deletion" });
        }

        const deleted = await AllStudentsModel.findByIdAndDelete(id);
        
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Record not found" });
        }

        return res.status(200).json({
            status: "success",
            message: "Student record deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Failed to delete student record" });
    }
};