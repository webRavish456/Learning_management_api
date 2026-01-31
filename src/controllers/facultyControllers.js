import FacultyModel from "../models/facultyModel.js";

/* ======================================================
   CREATE FACULTY
====================================================== */
export const postFaculty = async (req, res) => {
  try {
    const {
      teacherName,
      gender,
      dob,
      mobileNumber,
      emailId,
      experience,
      qualification,
      address,
      companyDetails,
      bankDetails,
    } = req.body;

    if (!teacherName || !emailId || !mobileNumber) {
      return res.status(400).json({
        status: "error",
        message: "Teacher Name, Email and Mobile Number are required",
      });
    }

    /* ===== Parse nested JSON ===== */
    const parsedCompany =
      typeof companyDetails === "string"
        ? JSON.parse(companyDetails)
        : companyDetails || {};

    const parsedBank =
      typeof bankDetails === "string"
        ? JSON.parse(bankDetails)
        : bankDetails || {};

    /* ===== Duplicate check ===== */
    const existing = await FacultyModel.findOne({
      $or: [{ emailId }, { mobileNumber }],
    });

    if (existing) {
      return res.status(400).json({
        status: "error",
        message:
          existing.emailId === emailId
            ? "Email already exists"
            : "Mobile Number already exists",
      });
    }

    /* ===== FILES FROM MULTER ===== */
    const files = req.files || {};

    const newTeacher = await FacultyModel.create({
      teacherName,
      gender: gender || "male",
      dob: dob || new Date("1995-01-01"),
      mobileNumber: Number(mobileNumber),
      emailId,
      experience: experience || "0",
      qualification: qualification || "NA",
      address: address || "NA",

      companyDetails: {
        branchName: parsedCompany.branchName || "Main Branch",
        courseName: parsedCompany.courseName || "General",
        salary: Number(parsedCompany.salary) || 0,
        joiningDate: parsedCompany.joiningDate || new Date(),
      },

      documents: {
        resumeCertificate:
          files.resumeCertificate?.[0]?.filename || "no-file.pdf",
        highestQualificationCertificate:
          files.highestQualificationCertificate?.[0]?.filename ||
          "no-file.pdf",
        panCard: files.panCard?.[0]?.filename || "no-file.pdf",
        aadharCard: files.aadharCard?.[0]?.filename || "no-file.pdf",
      },

      bankDetails: {
        accountHolderName: parsedBank.accountHolderName || teacherName,
        accountNumber: Number(parsedBank.accountNumber) || 0,
        bankName: parsedBank.bankName || "NA",
        ifscCode: parsedBank.ifscCode || "NA",
        branch: parsedBank.branch || "NA",
        branchLocation: parsedBank.branchLocation || "NA",
      },

      status: "Active",
    });

    return res.status(201).json({
      status: "success",
      message: "Teacher created successfully",
      data: newTeacher,
    });
  } catch (error) {
    console.error("Create Faculty Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ======================================================
   GET ALL FACULTY
====================================================== */
export const getFaculty = async (req, res) => {
  try {
    const teachers = await FacultyModel.find().sort({ createdAt: -1 });

    const formatted = teachers.map((t) => ({
      _id: t._id,
      teacherName: t.teacherName,
      gender: t.gender,
      mobileNumber: t.mobileNumber,
      emailId: t.emailId,
      experience: t.experience,
      status: t.status,

      courseName: t.companyDetails?.courseName || "-",
      branchName: t.companyDetails?.branchName || "-",

      companyDetails: t.companyDetails,
      bankDetails: t.bankDetails,
      documents: t.documents,
      dob: t.dob,
      qualification: t.qualification,
      address: t.address,
      createdAt: t.createdAt,
    }));

    res.status(200).json({
      status: "success",
      data: formatted,
    });
  } catch (error) {
    console.error("Get Faculty Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/* ======================================================
   GET FACULTY BY ID
====================================================== */
export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await FacultyModel.findById(id);
    if (!teacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/* ======================================================
   UPDATE FACULTY (SAFE VERSION)
====================================================== */
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    /* ===== SAFE PARSING ===== */
    let parsedCompany;
    let parsedBank;

    if (req.body.companyDetails) {
      parsedCompany =
        typeof req.body.companyDetails === "string"
          ? JSON.parse(req.body.companyDetails)
          : req.body.companyDetails;
    }

    if (req.body.bankDetails) {
      parsedBank =
        typeof req.body.bankDetails === "string"
          ? JSON.parse(req.body.bankDetails)
          : req.body.bankDetails;
    }

    /* ===== BUILD UPDATE OBJECT ===== */
    const updateData = {
      ...req.body,
    };

    if (parsedCompany) {
      updateData.companyDetails = parsedCompany;
    }

    if (parsedBank) {
      updateData.bankDetails = parsedBank;
    }

    const updatedTeacher = await FacultyModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.error("Update Faculty Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/* ======================================================
   DELETE FACULTY
====================================================== */
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FacultyModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
