import mongoose from "mongoose";

const courseListSchema = new mongoose.Schema(
   
  {
  
    courseName: { 
      type: String, 
      required: true,
      unique:true
    },
  
    courseDescription: { 
      type: String, 
      required: true,
    },
  
    duration: { 
      type: String, 
      required: true,
    },
  
    pricing: { 
      type: Number, 
      required: true,
    },
  
    syllabus: { 
      type: String, 
    },
  
    status: { 
      type: String, 
      default: "Active",
    },
  },

  { timestamps: true }
  
);

const CourseListModel = mongoose.model('CourseList', courseListSchema);

export default CourseListModel