import recordedClassesModel from "../models/recordedClassesModel.js";


export const createRecordedClass = async (req, res) => {
  try {
    
    const { studentName, enrollmentNo, subjectName, teacherName } = req.body;

   
    if (!studentName || !enrollmentNo || !subjectName || !teacherName) {
      return res.status(400).json({ 
        success: false, 
        message: "Student Name, Enrollment No, Subject, and Teacher are required!" 
      });
    }

    
    const newClassData = {
      studentName,
      enrollmentNo,
      subjectName,
      teacherName,
     
      title: req.body.title || `${subjectName} - ${studentName}`, 
      description: req.body.description || "Recorded class session",
      courseName: req.body.courseName || "General Course",
      videoUrl: req.body.videoUrl || "https://example.com/default-video",
      duration: req.body.duration || "0",
      UploadDate: req.body.UploadDate || new Date()
    };

    const newClass = new recordedClassesModel(newClassData);
    const savedClass = await newClass.save();

    res.status(201).json({ 
      success: true, 
      status: "success", 
      message: "Data saved successfully!", 
      data: savedClass 
    });
  } catch (error) {
    
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllRecordedClasses = async (req, res) => {
  try {
    const classes = await recordedClassesModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, status: "success", data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getRecordedClassById = async (req, res) => {
  try {
    const data = await recordedClassesModel.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, status: "success", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateRecordedClass = async (req, res) => {
  try {
    const updated = await recordedClassesModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.status(200).json({ success: true, status: "success", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteRecordedClass = async (req, res) => {
  try {
    const deleted = await recordedClassesModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ 
      success: true, 
      status: "success", 
      message: "Deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};