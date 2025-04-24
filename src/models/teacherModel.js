import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
   
    teacherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique:true
    },
    emailId: {
      type: String,
      required: true,
      unique:true
    },
    experience: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    companyDetails: {
      branchName: {
        type: String,
        required: true,
      },
      courseName: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
      joiningDate: {
        type: Date,
        required: true,
      },
    },
    documents: {
      resumeCertificate: {
        type: String,
        required: true,
      },
      highestQualificationCertificate: {
        type: String,
        required: true,
      },
      panCard: {
        type: String,
        required: true,
      },
      aadharCard: {
        type: String,
        required: true,
      },
    },
    bankDetails: {
      accountHolderName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: Number,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      ifscCode: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      branchLocation: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model("Teacher", teacherSchema);

export default TeacherModel;
