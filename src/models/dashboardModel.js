import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    studentCourse: [
      {
        name: { type: String },
        value: { type: Number }
      }
    ],

    dailyExam: [
      {
        date: { type: String },
        exam: { type: Number }
      }
    ],

    assignmentData: [
      {
        name: { type: String },
        value: { type: Number }
      }
    ],

    teacherData: [
      {
        name: { type: String },
        value: { type: Number }
      }
    ],

    generatedAt: {
      type: Date,
      default: Date.now
    }

  },
  { timestamps: true }
);

const Dashboard =
  mongoose.models.Dashboard ||
  mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;