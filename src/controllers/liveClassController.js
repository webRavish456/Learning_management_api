import liveClassModel from "../models/liveClassmodel.js";

// 🟢 Create a new live class
export const createLiveClass = async (req, res) => {
  try {
    const { title, description, courseName, teacherName, date, timing, duration, meetingLink } = req.body;

    if (!title || !description ||!courseName||!teacherName || !date || !timing || !duration || !meetingLink) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const newClass = new liveClassModel({
      title,
      description,
      courseName,
      teacherName,
      date,
      timing,
      duration,
      meetingLink,
    });

    const savedClass = await newClass.save();
    res.status(201).json({ success: true, data: savedClass });
  } catch (error) {
    req.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get all live classes
export const getAllLiveClasses = async (req, res) => {
  try {
    const classes = await liveClassModel.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get live class by ID
export const getLiveClassById = async (req, res) => {
  try {
    const liveClass = await liveClassModel.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ success: false, message: "Live class not found" });
    res.status(200).json({ success: true, data: liveClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Update live class
export const updateLiveClass = async (req, res) => {
  try {
    const updatedClass = await liveClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ success: false, message: "Live class not found" });
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Delete live class
export const deleteLiveClass = async (req, res) => {
  try {
    const deletedClass = await liveClassModel.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ success: false, message: "Live class not found" });
    res.status(200).json({ success: true, message: "Live class deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
