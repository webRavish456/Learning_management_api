import DocumentSharingModel from "../models/documentSharingModel.js";

/* ================= CREATE ================= */
export const postDocumentsharing = async (req, res) => {
  try {
    // ✅ FRONTEND FIELD NAMES MATCH
    const { topic, topicDescription, course, teacher } = req.body;

    if (!topic || !topicDescription || !course || !teacher) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // ✅ FILE HANDLE (multer / cloudinary safe)
    const document =
      req.imageUrls?.document ||
      req.file?.path ||
      null;

    const newDoc = await DocumentSharingModel.create({
      topic,
      Description: topicDescription, // 👈 correct mapping
      course,
      teacher,
      document,
    });

    res.status(201).json({
      status: "success",
      message: "Document shared successfully",
      data: newDoc,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
export const getDocumentsharing = async (req, res) => {
  try {
    const data = await DocumentSharingModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getDocumentsharingById = async (req, res) => {
  try {
    const doc = await DocumentSharingModel.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        status: "error",
        message: "Document not found",
      });
    }

    res.status(200).json({ status: "success", data: doc });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateDocumentsharing = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.imageUrls?.document) {
      updateData.document = req.imageUrls.document;
    } else if (req.file?.path) {
      updateData.document = req.file.path;
    }

    // 🔁 description mapping if update comes from frontend
    if (updateData.topicDescription) {
      updateData.Description = updateData.topicDescription;
      delete updateData.topicDescription;
    }

    const updated = await DocumentSharingModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Document not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Document updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteDocumentsharing = async (req, res) => {
  try {
    const deleted = await DocumentSharingModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Document not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
