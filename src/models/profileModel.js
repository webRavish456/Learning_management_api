import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, default: "Male" },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
