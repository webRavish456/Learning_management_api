import multer from "multer";
import StudentresultModel from "../models/studentresultModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postStudentresult= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
  
    try {
  
      const { studentName, courseName, marksObtained, totalMarks, passingMarks} = req.body;
  
      if (!studentName  || !courseName || !marksObtained || !totalMarks || !passingMarks) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

    
    const sheet = req.imageUrls?.image || null;

      const newStudentresult = await StudentresultModel.create({ studentName, courseName,marksObtained, totalMarks, passingMarks, sheet });

      res.status(200).json({ status: "success", message: "Studentresult created successfully!" });
  
    } catch (error) {
      console.error("Error creating studentresult:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
    
  }
  
  };


  export const getStudentresult = async (req, res) => {
    try {
      const studentresult = await StudentresultModel.find();
  
      if (studentresult.length === 0) {
        return res.status(404).json({ status: "error", message: "Student Result not found" });
      }
  
      res.status(200).json({ status: "success", data: studentresult });
    } catch (error) {
      console.error("Error fetching studentresult:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getStudentresultById = async (req, res) => {
    try {
      const { id } = req.params; 

      const studentresult = await StudentresultModel.findById(id); 
  
      if (!studentresult) {
        return res.status(404).json({ status: "error", message: "Student Result not found" });
      }
  
      res.status(200).json({ status: "success", data: studentresult });
    } catch (error) {
      console.error("Error fetching studentresult:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateStudentresult = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    
    try {
      const { id } = req.params;
      const updateData = req.body; 

      if (req.imageUrls?.image) {
        updateData.sheet = req.imageUrls.image;
      }

      console.log(id, updateData)

      const updatedStudentresult =  await StudentresultModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedStudentresult) {
        return res.status(404).json({ status: "error", message: "Student Result not found" });
      }
  
      res.status(200).json({ status: "success", message: "Student Result updated successfully"});

    } catch (error) {
      console.error("Error updating studentresult:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deleteStudentresult = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudentresult = await StudentresultModel.deleteOne({ _id: id });
       
      if (deletedStudentresult.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Student Result not found" });
      }
  
      res.status(200).json({ status: "success", message: "Student Result deleted successfully" });
    } catch (error) {
      console.error("Error deleting studentresult:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };