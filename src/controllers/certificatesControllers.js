import CertificatesModel from "../models/certificatesModels.js";

/* ================= CREATE ================= */
export const postCertificates = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { studentName, courseName, duration } = req.body;

    if (!studentName || !courseName || !duration) {
      return res.status(400).json({
        status: "error",
        message: "Text fields are missing",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Certificate file is missing",
      });
    }

    const newCertificate = await CertificatesModel.create({
      studentName,
      courseName,
      duration,
      certificates: req.file.originalname,
    });

    res.status(201).json({
      status: "success",
      data: newCertificate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


/* ================= GET ALL ================= */
export const getCertificates = async (req, res) => {
  try {
    const certificates = await CertificatesModel.find().lean().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: certificates,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


/* ================= GET BY ID ================= */
export const getCertificatesById = async (req, res) => {
  try {
    const certificate = await CertificatesModel.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        status: "error",
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: certificate,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


/* ================= UPDATE ================= */
export const updateCertificates = async (req, res) => {
  try {
    const { studentName, courseName, duration, status } = req.body;

    const updateData = {
      studentName,
      courseName,
      duration,
      status,
    };

    if (req.file) {
      updateData.certificates = req.file.originalname;
    }

    await CertificatesModel.findByIdAndUpdate(req.params.id, updateData);

    res.status(200).json({
      status: "success",
      message: "Certificate updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


/* ================= DELETE ================= */
export const deleteCertificates = async (req, res) => {
  try {
    await CertificatesModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Certificate deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};