import recordedClassesModel from "../models/recordedClassesModel.js";

// 1. Create - Fixes "Validation Failed" Errors
export const createRecordedClass = async (req, res) => {
  try {
    // Frontend से आने वाले डेटा को निकालें
    const { studentName, enrollmentNo, subjectName, teacherName } = req.body;

    // ज़रूरी फील्ड्स की जांच करें
    if (!studentName || !enrollmentNo || !subjectName || !teacherName) {
      return res.status(400).json({ 
        success: false, 
        message: "Student Name, Enrollment No, Subject, and Teacher are required!" 
      });
    }

    // नया ऑब्जेक्ट बनाएं और मिसिंग फील्ड्स को डिफ़ॉल्ट वैल्यू दें
    const newClassData = {
      studentName,
      enrollmentNo,
      subjectName,
      teacherName,
      // नीचे दिए गए फील्ड्स आपके मॉडल में 'required' हैं, इसलिए इन्हें खाली नहीं छोड़ सकते
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
    // यहाँ आपको पता चलेगा कि कौन सा फील्ड अभी भी मिसिंग है
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All
export const getAllRecordedClasses = async (req, res) => {
  try {
    const classes = await recordedClassesModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, status: "success", data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get By ID
export const getRecordedClassById = async (req, res) => {
  try {
    const data = await recordedClassesModel.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, status: "success", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update
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

// 5. Delete
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