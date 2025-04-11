import mongoose from "mongoose";

const allstudentsSchema = new mongoose.Schema(

  {
    studentName: {
      type: String,
      required: true,
      // unique: true,
    },

    gender: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true
    },
    emailId: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    enrollmentDate: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "active"
    },
  },

  { timestamps: true },

);

const AllStudentsModel = mongoose.model('AllStudents', allstudentsSchema);

export default AllStudentsModel