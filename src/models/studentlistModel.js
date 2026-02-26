import mongoose from "mongoose";

const studentListSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional fields (to avoid unnecessary required errors)
    dob: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "male",
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    enrollmentDate: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["Ongoing", "Graduated", "Dropped", "Active", "Inactive"],
      default: "Ongoing",
    },
  },
  {
    timestamps: true,
  }
);

// Text search index
studentListSchema.index({ studentName: "text", emailId: "text" });

const StudentListModel =
  mongoose.models.StudentList ||
  mongoose.model("StudentList", studentListSchema);

export default StudentListModel;