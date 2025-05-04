import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
   
  {
    
    examName: { 
      type: String, 
      required: true,  
      unique:true
    },
  
    courseName: { 
      type: String, 
      required: true,
    },
  
    teacherName: { 
      type: String, 
      required: true,
    },
  
    examDate: { 
      type: Date, 
      required: true,
    },
  
    duration: {
      type: String, 
      required: true,
    },
  
    testType: { 
      type: String, 
      required: true,
    },
  
    totalMarks: { 
      type: Number, 
      required: true,
    },
  
    status: { 
      type: String, 
      default:"Upcoming"
    },
  },

  { timestamps: true }
  
);

const ExamModel = mongoose.model('Exam', examSchema);

export default ExamModel