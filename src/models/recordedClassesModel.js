
import mongoose from "mongoose";


const recordedClassesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
    videoUrl: {
      type: String,
      required: true,
    },
    UploadDate: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  }
);

const recordedClassesModel = mongoose.model(
  "recordedClasses",
  recordedClassesSchema
);

export default recordedClassesModel;
