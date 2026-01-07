import mongoose from "mongoose";

const courseListSchema = new mongoose.Schema(
  {
    // Frontend field: formData.courseId
    courseId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Frontend field: formData.courseName
    courseName: { 
      type: String, 
      required: true,
      unique: true,
      trim: true
    },

    // Frontend field: formData.courseDescription
    courseDescription: { 
      type: String, 
      required: true,
    },

    // Frontend field: formData.duration
    duration: { 
      type: String, 
      required: true,
    },

    // Frontend field: formData.pricing
    pricing: { 
      type: Number, 
      required: true,
    },

    // Frontend field: formData.assignedTeachers
    // Isse Array ya String dono rakha ja sakta hai, yahan String rakha hai 
    assignedTeachers: {
      type: String,
    },

    // Frontend field: formData.syllabus (File path string yahan save hoga)
    syllabus: { 
      type: String, 
    },

    // Frontend field: formData.video ya formData.videoUrl
    video: {
      type: String,
    },

    // Frontend field: formData.status
    status: { 
      type: String, 
      enum: ["Active", "Inactive"], // Validation ke liye
      default: "Active",
    },
  },
  { timestamps: true }
);

// Next.js hot reloading issue se bachne ke liye check
const CourseListModel = mongoose.models.CourseList || mongoose.model('CourseList', courseListSchema);

export default CourseListModel;