import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminModel from "../models/adminModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: "success",
      message: "Login Successful!",
      access_token: token
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};