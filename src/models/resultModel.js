import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
   
  {
    examName: { 
      type: String, 
      required: true,  
    },
  
    courseName: { 
      type: String, 
      required: true,
    },
  
    teacherName: { 
      type: String, 
      required: true,
    },
  
    testType: { 
      type: String, 
      required: true,
    },
  
    resultDate: { 
      type: Date, 
      required: true,
    },
  
    status: { 
      type: String, 
      default: "active",
    },
  },

  { timestamps: true }
  
);

const ResultModel = mongoose.model('Result', resultSchema);

export default ResultModel