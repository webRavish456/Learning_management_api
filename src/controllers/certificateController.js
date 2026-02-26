import Certificate from "../models/certificateModel.js";

/* ================= CREATE ================= */
export const createCertificate = async (req, res) => {
  try {
    const { StudentName, courseName, Duration } = req.body;

    if (!StudentName || !courseName || !Duration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cert = await Certificate.create({
      StudentName,
      courseName,
      Duration,
    });

    res.status(201).json({
      success: true,
      message: "Certificate saved successfully",
      data: cert,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= GET ALL ================= */
export const getAllCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: certs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= UPDATE ================= */
export const updateCertificate = async (req, res) => {
  try {
    const { StudentName, courseName, Duration } = req.body;

    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        StudentName,
        courseName,
        Duration,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= DELETE ================= */
export const deleteCertificate = async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};