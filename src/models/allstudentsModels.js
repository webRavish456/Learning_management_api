import mongoose from "mongoose";

const allstudentsSchema = new mongoose.Schema(

  {
    studentName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true
    },

    mobileNumber: {
      type: Number,
      required: true,
      unique: true
    },

    emailId: {
      type: String,
      required: true,
      unique: true
    },

    dob: {
      type: Date,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    enrollmentDate: {
      type: Date,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Ongoing"
    },
  },

  { timestamps: true },

);

const AllStudentsModel = mongoose.model('AllStudents', allstudentsSchema);

export default AllStudentsModel