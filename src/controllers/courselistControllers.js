import CourseListModel from "../models/courseListModel.js";

/* ================= CREATE COURSE ================= */
export const postCourselist = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);
    console.log("Incoming Files (Cloudinary URLs):", req.imageUrls);

    const {
      courseId,
      courseName,
      courseDescription,
      duration,
      pricing,
      assignedTeachers,
      status,
      video,
    } = req.body;

    /* ===== REQUIRED FIELD CHECK ===== */
    if (
      !courseId ||
      !courseName ||
      !courseDescription ||
      !duration ||
      pricing === undefined
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Required fields: courseId, courseName, courseDescription, duration, pricing",
      });
    }

    /* ===== DUPLICATE CHECK ===== */
    const existingCourse = await CourseListModel.findOne({
      $or: [{ courseId }, { courseName }],
    });

    if (existingCourse) {
      return res.status(409).json({
        status: "error",
        message: "Course ID or Course Name already exists",
      });
    }

    /* ===== FILES FROM CLOUDINARY ===== */
    const syllabus = req.imageUrls?.image || null;
    const videoFile = req.imageUrls?.video || video || null;

    /* ===== CREATE COURSE ===== */
    const newCourse = await CourseListModel.create({
      courseId: courseId.trim(),
      courseName: courseName.trim(),
      courseDescription,
      duration,
      pricing: Number(pricing),
      assignedTeachers,
      syllabus,
      video: videoFile,
      status: status || "Active",
    });

    return res.status(201).json({
      status: "success",
      message: "Course created successfully!",
      data: newCourse,
    });
  } catch (error) {
    console.error("Create Course Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET ALL COURSES ================= */
export const getCourselist = async (req, res) => {
  try {
    const data = await CourseListModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Get Course List Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= GET COURSE BY ID ================= */
export const getCourselistById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await CourseListModel.findById(id);

    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "Course not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    console.error("Get Course By ID Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= UPDATE COURSE ================= */
export const updateCourselist = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    /* ===== FILE UPDATES ===== */
    if (req.imageUrls?.image) {
      updateData.syllabus = req.imageUrls.image;
    }

    if (req.imageUrls?.video) {
      updateData.video = req.imageUrls.video;
    }

    /* ===== PRICING CAST ===== */
    if (updateData.pricing !== undefined) {
      updateData.pricing = Number(updateData.pricing);
    }

    const updatedCourse = await CourseListModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        status: "error",
        message: "Course not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Course updated successfully!",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/* ================= DELETE COURSE ================= */
export const deleteCourselist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await CourseListModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        status: "error",
        message: "Course not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
