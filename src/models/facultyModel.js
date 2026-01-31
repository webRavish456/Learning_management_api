import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "male",
    },

    dob: {
      type: Date,
    },

    experience: {
      type: String,
      default: "0",
    },

    qualification: {
      type: String,
      default: "NA",
    },

    address: {
      type: String,
      default: "NA",
    },

    /* ================= COMPANY DETAILS ================= */
    companyDetails: {
      branchName: {
        type: String,
        default: "Main Branch",
      },
      courseName: {
        type: String,
        default: "General",
      },
      salary: {
        type: Number,
        default: 0,
      },
      joiningDate: {
        type: Date,
      },
    },

    /* ================= DOCUMENTS ================= */
    documents: {
      resumeCertificate: String,
      highestQualificationCertificate: String,
      panCard: String,
      aadharCard: String,
    },

    /* ================= BANK DETAILS ================= */
    bankDetails: {
      accountHolderName: String,
      accountNumber: Number,
      bankName: String,
      ifscCode: String,
      branch: String,
      branchLocation: String,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

/* ✅ MODEL (FIXED) */
const FacultyModel =
  mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default FacultyModel;
