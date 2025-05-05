import multer from "multer";
import ResultModel from "../models/resultModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postResult = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { examName, courseName, teacherName, testType, resultDate} = req.body;
  
      if (!examName  || !courseName || !teacherName || !testType || !resultDate) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
    
      const newResult = await ResultModel.create({ examName, courseName, teacherName, testType, resultDate });

      res.status(200).json({ status: "success", message: "Result Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating result:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getResult = async (req, res) => {
    try {

      const result = await ResultModel.find(); 
      res.status(200).json({ status: "success", data: result });
      
    } catch (error) {
      console.error("Error fetching result:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getResultById = async (req, res) => {
    try {
      const { id } = req.params; 

      const result = await ResultModel.findById(id); 
  
      if (!result) {
        return res.status(404).json({ status: "error", message: "Result Details not found" });
      }
  
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      console.error("Error fetching result:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updatedResult = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {

        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }

     try {

      const { id } = req.params;
      const updateData = req.body; 

      const updatedResult =  await ResultModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedResult) {
        return res.status(404).json({ status: "error", message: "Result Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "Result Details updated successfully"});

    } catch (error) {
      console.error("Error updating result:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deletedResult = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedResult = await ResultModel.deleteOne({ _id: id });
       
      if (deletedResult.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Result Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "Result Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting result:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };