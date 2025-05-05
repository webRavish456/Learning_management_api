import multer from "multer";
import studentsAssignmentModel from "../models/studentsAssignment.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postStudentsAssignment = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const {studentName, assignmentTitle, course, teacher, dueDate,mobileNumber, status} = req.body;
  
      if (!assignmentTitle  || !studentName || !course || !teacher || !dueDate || !mobileNumber || !status ) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

    
     
      const newStudentsAssignment = await studentsAssignmentModel.create({ assignmentTitle, course, teacher, dueDate,mobileNumber, studentName, status });

      res.status(200).json({ status: "success", message: "students Assignment Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating studentsAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getStudentsAssignment = async (req, res) => {
    try {
      const studentsAssignments = await studentsAssignmentModel.find();

      res.status(200).json({ status: "success", data: studentsAssignments });
    } catch (error) {
      console.error("Error fetching students Assignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getStudentsAssignmentById = async (req, res) => {
    try {
      const { id } = req.params; 

      const studentsAssignment = await studentsAssignmentModel.findById(id); 
  
      if (!studentsAssignment) {
        return res.status(404).json({ status: "error", message: "Students Assignments Details not found" });
      }
  
      res.status(200).json({ status: "success", data:studentsAssignment});
    } catch (error) {
      console.error("Error fetching students Assignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateStudentsAssignment = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {

        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }

     try {

      const { id } = req.params;
      const updateData = req.body; 

      const updatedStudentsAssignment =  await studentsAssignmentModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedStudentsAssignment) {
        return res.status(404).json({ status: "error", message: "Students Assignment Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "Students Assignment Details updated successfully"});

    } catch (error) {
      console.error("Error updating studentsAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteStudentsAssignment= async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudentsAssignment= await studentsAssignmentModel.deleteOne({ _id: id });
       
      if (deletedStudentsAssignment.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Students Assignment Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "Students Assignment Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting studentsAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };