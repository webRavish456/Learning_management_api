import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Profile from "../models/profileModel.js";
import Admin from "../models/adminModel.js";

/* ================= CREATE PROFILE ================= */
export const postProfile = async (req, res) => {
  try {
    // 🔍 DEBUG (VERY IMPORTANT)
    console.log("REQ BODY =>", req.body);
    console.log("REQ FILE =>", req.file);

    const { name, email, mobileNo, address, dob, gender, password } = req.body;

    if (!name || !email || !mobileNo || !address || !dob || !gender || !password) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be filled",
      });
    }

    // 🔁 Duplicate check
    const exists = await Profile.findOne({
      $or: [{ email }, { mobileNo }],
    });

    if (exists) {
      return res.status(400).json({
        status: "error",
        message: "Email or Mobile already exists",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🖼 Profile photo
    const profilePhoto =
      req.imageUrls?.image || (req.file ? req.file.path : "");

    // 📦 CREATE PROFILE (MongoDB)
    const profile = await Profile.create({
      name,
      email,
      mobileNo,
      address,
      dob: new Date(dob),
      gender,
      password: hashedPassword,
      profilePhoto,
    });

    console.log("PROFILE SAVED =>", profile._id);

    // 👤 Create Admin login
    await Admin.create({
      email,
      password: hashedPassword,
      userId: profile._id,
    });

    return res.status(201).json({
      status: "success",
      message: "Profile created successfully",
      data: {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        mobileNo: profile.mobileNo,
        profilePhoto: profile.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Create Profile Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET ALL PROFILES ================= */
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().select("-password");

    return res.status(200).json({
      status: "success",
      data: profiles,
    });
  } catch (error) {
    console.error("Get Profiles Error:", error);
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

    let profile = null;

    if (id && mongoose.Types.ObjectId.isValid(id)) {
      profile = await Profile.findById(id).select("-password");
    } else if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      profile = await Profile.findOne({ email: decoded.email }).select(
        "-password"
      );
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
    console.error("Get Profile Error:", error);
    return res.status(401).json({
      status: "error",
      message: "Invalid token or server error",
    });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid profile ID",
      });
    }

    console.log("UPDATE BODY =>", req.body);
    console.log("UPDATE FILE =>", req.file);

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
      await Admin.updateOne(
        { userId: id },
        {
          $set: {
            ...(updateData.email && { email: updateData.email }),
            ...(updateData.password && { password: updateData.password }),
          },
        }
      );
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!updatedProfile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    console.log("PROFILE UPDATED =>", updatedProfile._id);

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
