import multer from "multer";
import TimetableModel from "../models/timetableModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postTimetable = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { courseName, teacherName,startTiming,lastTiming,workDays,status} = req.body;
      console.log(req.body)  //check
  
      if (! courseName|| !teacherName|| !startTiming|| !lastTiming|| !workDays) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
     
      const newTimetable = await TimetableModel.create({ courseName, teacherName,startTiming,lastTiming,workDays });

      res.status(200).json({ status: "success", message: "TimeTable created successfully!" });
  
    } catch (error) {
      console.error("Error creating timetable:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getTimetable = async (req, res) => {
    try {
      const timetables = await TimetableModel.find();
  
      res.status(200).json({ status: "success", data: timetables });
    } catch (error) {
      console.error("Error fetching timetable:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getTimetableById = async (req, res) => {
    try {
      const { id } = req.params; 

      const timetable = await TimetableModel.findById(id); 
  
      if (!timetable) {
        return res.status(404).json({ status: "error", message: "Timetable not found" });
      }
  
      res.status(200).json({ status: "success", data: timetable });
    } catch (error) {
      console.error("Error fetching timetable:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateTimetable = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedTimetable =  await TimetableModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedTimetable) {
        return res.status(404).json({ status: "error", message: "Timetable not found" });
      }
  
      res.status(200).json({ status: "success", message: "Timetable updated successfully"});

    } catch (error) {
      console.error("Error updating timetable:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteTimetable = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTimetable = await TimetableModel.deleteOne({ _id: id });
       
      if (deletedTimetable.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Timetable not found" });
      }
  
      res.status(200).json({ status: "success", message: "Timetable deleted successfully" });
    } catch (error) {
      console.error("Error deleting timetable:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };