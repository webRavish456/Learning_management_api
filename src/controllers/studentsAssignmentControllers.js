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
  
      const { assignmentTitle, course, teacher, dueDate} = req.body;
  
      if (!assignmentTitle  || !course || !teacher || !dueDate  ) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      const [day, month, year] =dueDate.split("/");

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     
      const newStudentsAssignment = await studentsAssignmentModel.create({ assignmentTitle, course, teacher, dueDate:formattedDate });

      res.status(200).json({ status: "success", message: "studentsAssignment Detail created successfully!" });
  
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
  
      if (studentsAssignments.length === 0) {
        return res.status(404).json({ status: "error", message: "StudentsAssignment Details not found" });
      }
  
      res.status(200).json({ status: "success", data: studentsAssignments });
    } catch (error) {
      console.error("Error fetching studentsAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getStudentsAssignmentById = async (req, res) => {
    try {
      const { id } = req.params; 

      const studentsAssignment = await studentsAssignmentModel.findById(id); 
  
      if (!studentsAssignment) {
        return res.status(404).json({ status: "error", message: "StudentsAssignments Details not found" });
      }
  
      res.status(200).json({ status: "success", data:studentsAssignment});
    } catch (error) {
      console.error("Error fetching studentsAssignment:", error);
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

      if(updateData.dueDate)
      {
        const [day, month, year] = updateData.dueDate.split("/");

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        updateData.dueDate=new Date(formattedDate)
      }

      const updatedStudentsAssignment =  await studentsAssignmentModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedStudentsAssignment) {
        return res.status(404).json({ status: "error", message: "StudentsAssignment Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "StudentsAssignment Details updated successfully"});

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
        return res.status(404).json({ status: "error", message: "StudentsAssignment Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "StudentsAssignment Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting studentsAssignment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };