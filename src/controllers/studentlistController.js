import StudentListModel from "../models/allstudentsModels.js";

/* ================= CREATE STUDENT ================= */
export const postAllStudents = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    let {
      studentName,
      emailId,
      mobileNumber,
      dob,
      gender,
      address,
      enrollmentDate,
      course,
      status,
    } = req.body;

    // Trim & normalize
    studentName = studentName?.trim();
    emailId = emailId?.trim().toLowerCase();
    mobileNumber = mobileNumber?.trim();
    course = course?.trim();

    // Required field check
    if (!studentName || !emailId || !mobileNumber || !course) {
      return res.status(400).json({
        status: "error",
        message:
          "studentName, emailId, mobileNumber and course are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    // Mobile validation (exact 10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        status: "error",
        message: "Mobile number must be exactly 10 digits",
      });
    }

    // Duplicate email check
    const existingStudent = await StudentListModel.findOne({ emailId });
    if (existingStudent) {
      return res.status(409).json({
        status: "error",
        message: "Email ID already exists",
      });
    }

    // Create student
    const newStudent = await StudentListModel.create({
      studentName,
      emailId,
      mobileNumber,
      dob: dob || "",
      gender: gender || "male",
      address: address || "",
      enrollmentDate: enrollmentDate || "",
      course,
      status: status || "Ongoing",
    });

    return res.status(201).json({
      status: "success",
      message: "Student record created successfully",
      data: newStudent,
    });

  } catch (error) {
    console.error("Create Student Error:", error);

    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};


/* ================= GET ALL STUDENTS ================= */
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentListModel.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      status: "success",
      count: students.length,
      data: students,
    });

  } catch (error) {
    console.error("Get Students Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch student list",
    });
  }
};