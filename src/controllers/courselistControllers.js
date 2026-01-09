import CourseListModel from "../models/courseListModel.js";


export const postCourselist = async (req, res) => {
    console.log("Incoming Body:", req.body);
    console.log("Incoming Files (Cloudinary URLs):", req.imageUrls);

    try {
        const { 
            courseId, courseName, courseDescription, 
            duration, pricing, assignedTeachers, status 
        } = req.body;

       
        if (!courseId || !courseName || !courseDescription || !duration || !pricing) {
            return res.status(400).json({ 
                status: "error", 
                message: "Essential fields (courseId, courseName, courseDescription, duration, pricing) are missing",
                receivedData: req.body 
            });
        }

       
        const existingCourse = await CourseListModel.findOne({ $or: [{ courseId }, { courseName }] });
        if (existingCourse) {
            return res.status(400).json({ status: "error", message: "Course ID or Name already exists" });
        }

       
        const syllabus = req.imageUrls?.image || null;
        const videoFile = req.imageUrls?.video || req.body.video || null;

        const newCourse = await CourseListModel.create({
            courseId,
            courseName,
            courseDescription,
            duration,
            pricing: Number(pricing),
            assignedTeachers,
            syllabus,
            video: videoFile,
            status: status || "Active"
        });

        res.status(200).json({ 
            status: "success", 
            message: "Course created successfully!", 
            data: newCourse 
        });

    } catch (error) {
        console.error("Create Controller Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const getCourselist = async (req, res) => {
    try {
        const data = await CourseListModel.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", data });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const getCourselistById = async (req, res) => {
    try {
        const course = await CourseListModel.findById(req.params.id);
        if (!course) return res.status(404).json({ status: "error", message: "Course not found" });
        res.status(200).json({ status: "success", data: course });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const updateCourselist = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.imageUrls?.image) {
            updateData.syllabus = req.imageUrls.image;
        }

        if (req.imageUrls?.video) {
            updateData.video = req.imageUrls.video;
        }

       
        if (updateData.pricing) {
            updateData.pricing = Number(updateData.pricing);
        }

        const updated = await CourseListModel.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true }
        );
        
        if (!updated) {
            return res.status(404).json({ status: "error", message: "Course not found" });
        }

        res.status(200).json({ 
            status: "success", 
            message: "Course updated successfully!", 
            data: updated 
        });

    } catch (error) {
        console.error("Update Controller Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const deleteCourselist = async (req, res) => {
    try {
        const deleted = await CourseListModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ status: "error", message: "Course not found" });
        
        res.status(200).json({ status: "success", message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};