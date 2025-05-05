import CourseListModel from "../models/courseListModel.js"


export const postCourselist = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
  
    try {
  
      const { courseName, courseDescription, duration, pricing} = req.body;
  
      if (!courseName || !courseDescription ||  !duration || !pricing || !req.imageUrls?.image) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      const syllabus =  req.imageUrls?.image || null

      const existingCourse = await CourseListModel.findOne({ courseName });

      if (existingCourse) {
        return res.status(400).json({ status: "error", message: "Course Name already exists" });
      }
      
      const newCourselist = await CourseListModel.create({ courseName, courseDescription, duration, pricing, syllabus });

      res.status(200).json({ status: "success", message: "Course Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating courselist:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  }
  
  };


  export const getCourselist = async (req, res) => {
    try {
      const courselist = await CourseListModel.find();
  
      res.status(200).json({ status: "success", data: courselist });
    } catch (error) {
      console.error("Error fetching courselist:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getCourselistById = async (req, res) => {
    try {
      const { id } = req.params; 

      const courselist = await CourseListModel.findById(id); 
  
      if (!courselist) {
        return res.status(404).json({ status: "error", message: "Courselist Details not found" });
      }
  
      res.status(200).json({ status: "success", data: courselist });
    } catch (error) {
      console.error("Error fetching courselist:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateCourselist = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
   
     try {

      const { id } = req.params;
      const updateData = req.body; 

      if(req.imageUrls?.image) {
        updateData.syllabus=req.imageUrls?.image
      }

      const existingData = await CourseListModel.find({ _id: { $ne: id } });

      const isCourseExists = existingData.some((doc) => doc.courseName === updateData.courseName);
      if (isCourseExists) {
        return res.status(400).json({ status: "error", message: "This course name is already registered." });
      }
      
      const updatedCourselist =  await CourseListModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedCourselist) {
        return res.status(404).json({ status: "error", message: "Course Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "Course Details updated successfully"});

    } catch (error) {
      console.error("Error updating courselist:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deleteCourselist = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCourselist = await CourseListModel.deleteOne({ _id: id });
       
      if (!deletedCourselist) {
        return res.status(404).json({ status: "error", message: "Course Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "Course Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting courselist:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };