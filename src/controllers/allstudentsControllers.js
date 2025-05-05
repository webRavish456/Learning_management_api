import multer from "multer";
import AllStudentsModel from "../models/allstudentsModels.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAllStudents = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { studentName, gender, mobileNumber, emailId, dob, address, enrollmentDate,course} = req.body;
  
      if (!studentName  || !gender || !mobileNumber || !emailId || !dob || !address || !enrollmentDate|| !course) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      const newAllStudents = await AllStudentsModel.create({ studentName, gender,mobileNumber, emailId,dob,address,enrollmentDate,course });

      res.status(200).json({ status: "success", message: "All Students list created successfully!" });
  
    } catch (error) {
      console.error("Error creating allstudents list:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAllStudents = async (req, res) => {
    try {
      const allstudents = await AllStudentsModel.find();
  
      res.status(200).json({ status: "success", data: allstudents });
    } catch (error) {
      console.error("Error fetching allstudents:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllStudentsById = async (req, res) => {
    try {
      const { id } = req.params; 

      const allstudents = await AllStudentsModel.findById(id); 
  
      if (!allstudents) {
        return res.status(404).json({ status: "error", message: "Allstudents List not found" });
      }
  
      res.status(200).json({ status: "success", data: allstudents });
    } catch (error) {
      console.error("Error fetching allstudents:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAllStudents = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
   
        try {
      const { id } = req.params;
      const updateData = req.body; 

      const existingData = await AllStudentsModel.find({ _id: { $ne: id } });

      const isMobileExists = existingData.some((doc) => doc.mobileNumber == updateData.mobileNumber);
      if (isMobileExists) {
        return res.status(400).json({ status: "error", message: "This mobile number is already registered." });
      }
      
      const isEmailExists = existingData.some((doc) => doc.emailId === updateData.emailId);
      if (isEmailExists) {
        return res.status(400).json({ status: "error", message: "This email Id is already registered." });
      }

      const updatedAllStudents =  await AllStudentsModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllStudents) {
        return res.status(404).json({ status: "error", message: "Allstudents list not found" });
      }
  
      res.status(200).json({ status: "success", message: "Allstudent list updated successfully"});

    } catch (error) {
      console.error("Error updating allstudents:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteAllStudents = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAllStudents = await AllStudentsModel.deleteOne({ _id: id });
       
      if (deletedAllStudents.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "AllStudents list not found" });
      }
  
      res.status(200).json({ status: "success", message: "Allstudents list deleted successfully" });
    } catch (error) {
      console.error("Error deleting allstudents list:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };