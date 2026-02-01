import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNo: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },

    password: {
      type: String,
      required: true, 
      select: false, // 🔐 by default password API response me nahi aayega
    },

    profilePhoto: {
      type: String, // image path / filename
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      default: "Super Admin", // future role based access ke liye
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
