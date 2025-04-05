import multer from "multer";
import ExamModel from "../models/examModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postExam = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { examName, courseName, teacherName, examDate, duration, testType, totalMarks} = req.body;
  
      if (!examName  || !courseName || !teacherName || !examDate || !duration || !testType || !totalMarks) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      // const existingExam = await ExamModel.findOne({
      //   $or: [{ examName }, { courseName }, { teacherName }, { examDate }, { duration }, { testType }, { totalMarks }]
      // });
      
      // if (existingExam) {
      //   if (existingExam.examName === examName) {
      //     return res.status(400).json({ status: "error", message: "Exam Name already exists" });
      //   }
      //   if (existingExam.courseName === courseName) {
      //     return res.status(400).json({ status: "error", message: "Course Name already exists" });
      //   }
      //   if (existingExam.teacherName === teacherName) {
      //       return res.status(400).json({ status: "error", message: "Teacher Name already exists" });
      //   }
      //   if (existingExam.examDate === examDate) {
      //       return res.status(400).json({ status: "error", message: "Exam Date already exists" });
      //   }
      //   if (existingExam.duration === duration) {
      //       return res.status(400).json({ status: "error", message: "Duration already exists" });
      //   }
      //   if (existingExam.testType === testType) {
      //       return res.status(400).json({ status: "error", message: "Test Type already exists" });
      //   }
      //   if (existingExam.totalMarks === totalMarks) {
      //       return res.status(400).json({ status: "error", message: "Total Marks already exists" });
      //   }
      // }
      
      const newExam = await ExamModel.create({ examName, courseName, teacherName, examDate, duration, testType, totalMarks });

      res.status(200).json({ status: "success", message: "Exam Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating exam:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getExam = async (req, res) => {
    try {
      const exams = await ExamModel.find();
  
      if (exams.length === 0) {
        return res.status(404).json({ status: "error", message: "Exams Details not found" });
      }
  
      res.status(200).json({ status: "success", data: exams });
    } catch (error) {
      console.error("Error fetching exam:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getExamById = async (req, res) => {
    try {
      const { id } = req.params; 

      const exam = await ExamModel.findById(id); 
  
      if (!exam) {
        return res.status(404).json({ status: "error", message: "Exams Details not found" });
      }
  
      res.status(200).json({ status: "success", data: exam });
    } catch (error) {
      console.error("Error fetching exam:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateExam = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedExam =  await ExamModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedExam) {
        return res.status(404).json({ status: "error", message: "Exam Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "Exam Details updated successfully"});

    } catch (error) {
      console.error("Error updating exam:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteExam = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedExam = await ExamModel.deleteOne({ _id: id });
       
      if (deletedExam.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Exam Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "Exam Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting exam:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };