import multer from "multer";
import fs from "fs";
import path from "path";

// ✅ ABSOLUTE PATH (Windows + Nodemon safe)
const uploadDir = path.resolve(process.cwd(), "uploads", "leave");

// ✅ Ensure folder exists (VERY IMPORTANT)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // spaces → underscore (Windows safe)
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const uploadLeave = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

export default uploadLeave;
