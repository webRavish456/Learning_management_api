import recordedClassesModel from "../models/recordedClassesModel.js";

// 🟢 Create a new recorded class
export const createRecordedClass = async (req, res) => {
  try {
    const { title, description, courseName, teacherName, videoUrl, UploadDate, duration } = req.body;

    if (!title || !description || !courseName || !teacherName || !videoUrl || !UploadDate || !duration) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newClass = new recordedClassesModel({
      title,
      description,
      courseName,
      teacherName,
      videoUrl,
      UploadDate,
      duration,
    });

    const savedClass = await newClass.save();
    res.status(201).json({ success: true, data: savedClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get all recorded classes
export const getAllRecordedClasses = async (req, res) => {
  try {
    const classes = await recordedClassesModel.find().sort({ UploadDate: -1 });
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get recorded class by ID
export const getRecordedClassById = async (req, res) => {
  try {
    const recordedClass = await recordedClassesModel.findById(req.params.id);
    if (!recordedClass) return res.status(404).json({ success: false, message: "Recorded class not found" });
    res.status(200).json({ success: true, data: recordedClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Update recorded class
export const updateRecordedClass = async (req, res) => {
  try {
    const updatedClass = await recordedClassesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ success: false, message: "Recorded class not found" });
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Delete recorded class
export const deleteRecordedClass = async (req, res) => {
  try {
    const deletedClass = await recordedClassesModel.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ success: false, message: "Recorded class not found" });
    res.status(200).json({ success: true, message: "Recorded class deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
