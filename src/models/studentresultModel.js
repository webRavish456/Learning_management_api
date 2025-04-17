import mongoose from "mongoose";

const studentresultSchema = new mongoose.Schema(

  {
    studentName: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true
    },
    marksObtained: {
      type: String,
      required: true
    },
    totalMarks: {
        type: String,
        required: true
      },
    passingMarks: {
        type: String,
        required: true
      },
    sheet: {
      type: String,
    },
    status: {
      type: String,
      default: "active"
    }
  },

  { timestamps: true },

);

const StudentresultModel = mongoose.model('Studentresult', studentresultSchema);

export default StudentresultModel