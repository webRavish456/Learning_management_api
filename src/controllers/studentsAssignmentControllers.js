import multer from "multer";
import studentsAssignmentModel from "../models/studentsAssignment.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const saveAssignment = async (data, res) => {
  try {
    const { 
      studentName, 
      assignmentTitle, 
      dueDate, 
      status, 
      course, 
      teacher, 
      mobileNumber 
    } = data;

   
    if (!studentName || !assignmentTitle || !dueDate || !status) {
      return res.status(400).json({ 
        status: "error", 
        message: "Required fields (Name, Title, Date, Status) are missing" 
      });
    }

    const newStudentsAssignment = await studentsAssignmentModel.create({
      studentName,
      assignmentTitle,
      dueDate,
      status,
      course: course || "General",
      teacher: teacher || "Staff",
      mobileNumber: mobileNumber || "N/A"
    });

    return res.status(200).json({ 
      status: "success", 
      message: "Students Assignment Detail created successfully!",
      data: newStudentsAssignment 
    });

  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const postStudentsAssignment = async (req, res) => {
  const contentType = req.headers["content-type"];

  if (contentType && contentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) return res.status(500).json({ status: "error", message: "Error handling form data" });
      await saveAssignment(req.body, res);
    });
  } else {
   
    await saveAssignment(req.body, res);
  }
};

export const getStudentsAssignment = async (req, res) => {
  try {
    const studentsAssignments = await studentsAssignmentModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: studentsAssignments });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const getStudentsAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentsAssignment = await studentsAssignmentModel.findById(id);

    if (!studentsAssignment) {
      return res.status(404).json({ status: "error", message: "Details not found" });
    }
    res.status(200).json({ status: "success", data: studentsAssignment });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const updateStudentsAssignment = async (req, res) => {
  const contentType = req.headers["content-type"];
  const { id } = req.params;

  const performUpdate = async (updateData) => {
    try {
      const updated = await studentsAssignmentModel.findByIdAndUpdate(
        id, 
        { $set: updateData }, 
        { new: true }
      );
      if (!updated) return res.status(404).json({ status: "error", message: "Not found" });
      res.status(200).json({ status: "success", message: "Updated successfully", data: updated });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

  if (contentType && contentType.includes("multipart/form-data")) {
    upload.none()(req, res, (err) => performUpdate(req.body));
  } else {
    performUpdate(req.body);
  }
};

export const deleteStudentsAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await studentsAssignmentModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Not found" });
    res.status(200).json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};