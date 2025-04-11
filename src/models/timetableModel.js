import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(

  {
    courseName: {
      type: String,
      required: true,
      // unique: true,
    },

    teacherName: {
      type: String,
      required: true
    },
    startTiming: {
      type: String,
      required: true
    },
    lastTiming: {
      type: String,
      required: true
    },
    workDays: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "active"
    },
  },

  { timestamps: true },

);

const TimetableModel = mongoose.model('Timetable', timetableSchema);

export default TimetableModel