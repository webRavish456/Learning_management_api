import mongoose from "mongoose";

const studentresultSchema = new mongoose.Schema(

  {
    studentName: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: Number,
      required:true
    },

   resultId: {
      type: String,
      required:true
    },
    courseName: {
      type: String,
      required: true
    },

    marksObtained: {
      type: Number,
      required: true
    },

    totalMarks: {
        type: Number,
        required: true
      },

    passingMarks: {
        type: Number,
        required: true
      },
      
    sheet: {
      type: String,
    },

    status: {
      type: String,
      required:true
    }
  },

  { timestamps: true },

);

const StudentresultModel = mongoose.model('Studentresult', studentresultSchema);

export default StudentresultModel