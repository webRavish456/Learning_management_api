import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
   
    {
        examName: { 
          type: String, 
          required: true, 
          
        },

        courseName: { 
          type: String, 
          required: true ,
          
        },
        teacherName: { 
            type: String, 
            required: true ,
            
          },
          examDate: { 
            type: String,
            required: true ,
  
          },
          duration: { 
            type: String, 
            required: true ,
          
          },
          testType: { 
            type: String, 
            required: true ,
            
          },
          totalMarks: { 
            type: String, 
            required: true ,
            
          },
        status: { 
          type: String, 
          default:"active",
        },
    },

    { timestamps: true }, 

);

const ExamModel = mongoose.model('Exam', examSchema);

export default ExamModel