import AllStudents from "../models/allstudentsModel.js";


export const postAllStudents = async (req, res) => {
    try {
        const {
            studentName,
            gender,
            mobileNumber,
            emailId,
            dob,
            address,
            enrollmentDate,
            course 
        } = req.body;

        
        if (!studentName || !mobileNumber || !emailId) {
            return res.status(400).json({
                status: "fail",
                message: "Missing required fields"
            });
        }

        const newStudent = await AllStudents.create({
            studentName,
            gender,
            mobileNumber,
            emailId,
            dob,
            address,
            enrollmentDate,
            course,
            status: "Active"
        });

        res.status(201).json({
            status: "success",
            data: newStudent
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


export const getAllStudents = async (req, res) => {
    try {
        const students = await AllStudents.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            data: students
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Data fetch failed"
        });
    }
};


export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await AllStudents.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedStudent) {
            return res.status(404).json({
                status: "fail",
                message: "Student not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: updatedStudent
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await AllStudents.findByIdAndDelete(id);

        res.status(200).json({
            status: "success",
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Delete failed"
        });
    }
};