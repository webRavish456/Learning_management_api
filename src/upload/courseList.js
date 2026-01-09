import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: "dywpuv3jk",
  api_key: "843216346619295",
  api_secret: "_pM6huf17wznJnFn0VY-Khgph3w",
  timeout: 600000 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'courseMaterials', 
      resource_type: 'auto', // ✅ Video/PDF के लिए अनिवार्य
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB Limit
}).fields([
  { name: 'syllabus', maxCount: 1 }, 
  { name: 'video', maxCount: 1 }
]);

const uploadCourse = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    const files = req.files;
    const imageUrls = {};
    if (files?.['syllabus']?.[0]) imageUrls.image = files['syllabus'][0].path;
    if (files?.['video']?.[0]) imageUrls.video = files['video'][0].path;
    req.imageUrls = imageUrls;
    next();
  });
};

export default uploadCourse;