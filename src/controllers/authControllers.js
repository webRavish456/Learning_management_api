import bcrypt from "bcryptjs";
import AdminModel from "../models/adminModel.js";
import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const secretKey = process.env.JWT_SECRET;

/* =================== 1. SIGNUP (New) =================== */
export const postSignup = async (req, res) => {
  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) return res.status(500).json({ status: "error", msg: "Error handling form data" });

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and Password are required" });
      }

      try {
        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ status: "error", message: "Admin already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to DB
        await AdminModel.create({ email, password: hashedPassword });

        res.status(201).json({ status: "success", message: "Admin Account Created Successfully!" });
      } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
      }
    });
  } else {
    res.status(400).json({ status: "error", message: "Content-Type must be multipart/form-data" });
  }
};

/* =================== 2. LOGIN =================== */
export const postAdmin = async (req, res) => {
  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) return res.status(500).json({ status: "error", msg: "Error handling form data" });

      const { email, password } = req.body;

      try {
        const existingAdmin = await AdminModel.findOne({ email });
        if (!existingAdmin || !existingAdmin.password) {
          return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordValid) {
          return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const access_token = jwt.sign(
          { userId: existingAdmin._id, email: existingAdmin.email },
          secretKey,
          { expiresIn: "28d" }
        );

        res.status(200).json({ 
          status: "success", 
          message: "Login Successfully!", 
          access_token 
        });
      } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });
  }
};

/* =================== 3. FORGOT PASSWORD =================== */
export const postForgot = async (req, res) => {
  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {
    upload.none()(req, res, async (err) => {
      if (err) return res.status(500).json({ status: "error", msg: "Error handling form data" });

      const { email, password, confirmpassword } = req.body;

      if (password !== confirmpassword) {
        return res.status(400).json({ status: "error", message: "Passwords do not match" });
      }

      try {
        const existingAdmin = await AdminModel.findOne({ email });
        if (!existingAdmin) return res.status(404).json({ status: "error", message: "Admin not found" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await AdminModel.updateOne({ email }, { $set: { password: hashedPassword } });

        res.status(200).json({ status: "success", message: "Password Updated Successfully!" });
      } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });
  }
};