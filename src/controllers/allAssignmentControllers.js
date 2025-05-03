import multer from "multer";
import AllAssignmentModel from "../models/allAssignmentModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAllAssignment = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { assignmentTitle, course, teacher, dueDate, totalCompletion} = req.body;
  
      if (!assignmentTitle  || !course|| !teacher || !dueDate || !totalCompletion) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      // const [day, month, year] =dueDate.split("/");

      // const now = new Date();
      // const hours = now.getHours();
      // const minutes = now.getMinutes();
      // const seconds = now.getSeconds();
      
      // const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     
      const newAllAssignment = await AllAssignmentModel.create({ assignmentTitle, course, teacher, dueDate, totalCompletion });

      res.status(200).json({ status: "success", message: "allAssignment Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating allAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAllAssignment = async (req, res) => {
    try {
      const allAssignments = await AllAssignmentModel.find();
  
      if (allAssignments.length === 0) {
        return res.status(404).json({ status: "error", message: "AllAssignment Details not found" });
      }
  
      res.status(200).json({ status: "success", data: allAssignments });
    } catch (error) {
      console.error("Error fetching allAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllAssignmentById = async (req, res) => {
    try {
      const { id } = req.params; 

      const allAssignment = await AllAssignmentModel.findById(id); 
  
      if (!allAssignment) {
        return res.status(404).json({ status: "error", message: "AllAssignments Details not found" });
      }
  
      res.status(200).json({ status: "success", data: allAssignment});
    } catch (error) {
      console.error("Error fetching allAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAllAssignment = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {

        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }

     try {

      const { id } = req.params;
      const updateData = req.body; 

      // if(updateData.dueDate)
      // {
      //   const [day, month, year] = updateData.dueDate.split("/");

      //   const now = new Date();
      //   const hours = now.getHours();
      //   const minutes = now.getMinutes();
      //   const seconds = now.getSeconds();
        
      //   const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      //   updateData.dueDate=new Date(formattedDate)
      // }

      const updatedAllAssignment =  await AllAssignmentModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllAssignment) {
        return res.status(404).json({ status: "error", message: "AllAssignment Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllAssignment Details updated successfully"});

    } catch (error) {
      console.error("Error updating allAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteAllAssignment= async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAllAssignment= await AllAssignmentModel.deleteOne({ _id: id });
       
      if (deletedAllAssignment.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "AllAssignment Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllAssignment Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting allAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };