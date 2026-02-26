import Student from "../models/allstudentsModels.js";
import Exam from "../models/examModels.js";
import Faculty from "../models/facultyModels.js";
import Assignment from "../models/allAssignmentModels.js";

export const getDashboardData = async (req, res) => {
  try {

    /* ================= STUDENTS PER COURSE ================= */
    const students = await Student.find().lean();

    const studentCourseMap = {};
    students.forEach((s) => {
      if (s.course) {
        studentCourseMap[s.course] =
          (studentCourseMap[s.course] || 0) + 1;
      }
    });

    const studentCourse = Object.entries(studentCourseMap).map(
      ([name, value]) => ({ name, value })
    );

    /* ================= EXAMS PER DAY ================= */
    const exams = await Exam.find().lean();

    const examMap = {};
    exams.forEach((e) => {
      const date = new Date(e.createdAt).toLocaleDateString();
      examMap[date] = (examMap[date] || 0) + 1;
    });

    const dailyExam = Object.entries(examMap).map(
      ([date, exam]) => ({ date, exam })
    );

    /* ================= ASSIGNMENT PER COURSE ================= */
    const assignments = await Assignment.find().lean();

    const assignmentMap = {};
    assignments.forEach((a) => {
      if (a.course) {
        assignmentMap[a.course] =
          (assignmentMap[a.course] || 0) + 1;
      }
    });

    const assignmentData = Object.entries(assignmentMap).map(
      ([name, value]) => ({ name, value })
    );

    /* ================= TEACHER PER COURSE ================= */
    const teachers = await Faculty.find().lean();

    const teacherMap = {};
    teachers.forEach((t) => {
      const course = t.companyDetails?.courseName;
      if (course) {
        teacherMap[course] =
          (teacherMap[course] || 0) + 1;
      }
    });

    const teacherData = Object.entries(teacherMap).map(
      ([name, value]) => ({ name, value })
    );

    /* ================= FINAL RESPONSE ================= */
    res.status(200).json({
      status: "success",
      data: {
        studentCourse,
        dailyExam,
        assignmentData,
        teacherData,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};