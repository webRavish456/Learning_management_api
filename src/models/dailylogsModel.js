import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      ref: 'EmployeeProfile', 
      required: true,
    },
    punchedIn: {
      type: Date,
      required: true,
    },
    punchedOut: {
      type: Date,
      required: false,
    },
    behavior: {
      type: String,
      default: "Normal",
    },
    breakTime: {
      type: Number, 
      default: 0,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
    entry: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Automatic",
    },
    
  },
  { timestamps: true }
);

const dailyLogModel = mongoose.model('TimeLog', dailyLogSchema);

export default dailyLogModel;