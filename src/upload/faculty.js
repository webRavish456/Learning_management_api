import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/faculty";

// ✅ ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  },
});

const uploadFaculty = multer({
  storage,
}).fields([
  { name: "resumeCertificate", maxCount: 1 },
  { name: "highestQualificationCertificate", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
]);

export default uploadFaculty;
