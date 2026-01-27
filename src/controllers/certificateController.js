import Certificate from "../models/certificateModel.js";

/* CREATE */
export const createCertificate = async (req, res) => {
  try {
    const { name, course, issuer } = req.body;

    if (!name || !course || !issuer) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cert = await Certificate.create({ name, course, issuer });

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

/* GET ALL */
export const getAllCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE */
export const updateCertificate = async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* DELETE */
export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
