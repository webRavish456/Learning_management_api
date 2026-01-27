import bcrypt from "bcryptjs";
import profileModel from "../models/profileModel.js";
import AdminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";

/* ================= CREATE PROFILE ================= */
export const postProfile = async (req, res) => {
  try {
    const { name, email, mobileNo, address, dob, gender, password } = req.body;

    if (!name || !email || !mobileNo || !password || !dob || !address) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be filled",
      });
    }

    const existing = await profileModel.findOne({
      $or: [{ email }, { mobileNo }],
    });

    if (existing) {
      return res.status(400).json({
        status: "error",
        message: "Email or Mobile already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto =
      req.imageUrls?.image || (req.file ? req.file.path : "");

    const profile = await profileModel.create({
      name,
      email,
      mobileNo,
      address,
      dob,
      gender,
      password: hashedPassword,
      profilePhoto,
    });

    await AdminModel.create({
      email,
      password: hashedPassword,
      userId: profile._id,
    });

    return res.status(201).json({
      status: "success",
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET ALL PROFILES (LIST) ================= */
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find().select("-password");

    return res.status(200).json({
      status: "success",
      data: profiles,
    });
  } catch (error) {
    console.error("Get profiles error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch profiles",
    });
  }
};

/* ================= GET SINGLE PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    let profile;

    if (id && id.length === 24) {
      profile = await profileModel.findById(id).select("-password");
    } else if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      profile = await profileModel
        .findOne({ email: decoded.email })
        .select("-password");
    }

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (req.imageUrls?.image) {
      updateData.profilePhoto = req.imageUrls.image;
    } else if (req.file) {
      updateData.profilePhoto = req.file.path;
    }

    if (updateData.email || updateData.password) {
      await AdminModel.updateOne(
        { userId: id },
        {
          $set: {
            ...(updateData.email && { email: updateData.email }),
            ...(updateData.password && { password: updateData.password }),
          },
        }
      );
    }

    const updatedProfile = await profileModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
