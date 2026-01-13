import mongoose from "mongoose";

const courseListSchema = new mongoose.Schema(
  {  courseId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
 courseName: { 
      type: String, 
      required: true,
      unique: true,
      trim: true
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

     assignedTeachers: {
      type: String,
    },
  syllabus: { 
      type: String, 
    },

   
    video: {
      type: String,
    },

   
    status: { 
      type: String, 
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const CourseListModel = mongoose.models.CourseList || mongoose.model('CourseList', courseListSchema);

export default CourseListModel;