import multer from "multer";
import CertificatesModel from "../models/certificatesModels.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postCertificates = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
  
    try {
  
      const { studentName, courseName, duration} = req.body;
  
      if (!studentName  || !courseName || !duration || !req.imageUrls?.image) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

    
    const certificates = req.imageUrls?.image || null;

      const newCertificates = await CertificatesModel.create({ studentName, courseName,duration, certificates });

      res.status(200).json({ status: "success", message: "Certificates created successfully!" });
  
    } catch (error) {
      console.error("Error creating certificates:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
    
  }
  
  };


  export const getCertificates = async (req, res) => {
    try {
      const certificates = await CertificatesModel.find();
  
      res.status(200).json({ status: "success", data: certificates });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getCertificatesById = async (req, res) => {
    try {
      const { id } = req.params; 

      const certificates = await CertificatesModel.findById(id); 
  
      if (!certificates) {
        return res.status(404).json({ status: "error", message: "certificates not found" });
      }
  
      res.status(200).json({ status: "success", data: certificates });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateCertificates = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    
    try {
      const { id } = req.params;
      const updateData = req.body; 

      if (req.imageUrls?.image) {
        updateData.certificates = req.imageUrls.image;
      }

      const updatedCertificates =  await CertificatesModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedCertificates) {
        return res.status(404).json({ status: "error", message: "Certificates not found" });
      }
  
      res.status(200).json({ status: "success", message: "Certificates updated successfully"});

    } catch (error) {
      console.error("Error updating certificates:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deleteCertificates = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCertificates = await CertificatesModel.deleteOne({ _id: id });
       
      if (deletedCertificates.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Certificates not found" });
      }
  
      res.status(200).json({ status: "success", message: "Certificates deleted successfully" });
    } catch (error) {
      console.error("Error deleting certificates:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };