import bcrypt from "bcryptjs";
import profileModel from "../models/profileModel.js";
import AdminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";


export const postProfile = async (req, res) => {
    try {
   
        const { name, email, mobileNo, address, dob, gender, password } = req.body;

       
        if (!name || !email || !mobileNo || !password || !dob || !address) {
            return res.status(400).json({ 
                status: "error", 
                message: "Missing fields. Ensure you are sending name, email, mobileNo, password, dob, and address." 
            });
        }

        
        const existingData = await profileModel.findOne({
            $or: [{ mobileNo }, { email }]
        });

        if (existingData) {
            const field = existingData.email === email ? "Email Id" : "Mobile Number";
            return res.status(400).json({ status: "error", message: `${field} already exists` });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const profilePhoto = req.imageUrls?.image || (req.file ? req.file.path : ""); 

      
        const profile = await profileModel.create({
            name, email, mobileNo, address, dob, gender,
            password: hashedPassword,
            profilePhoto
        });

        
        await AdminModel.create({
            email,
            password: hashedPassword,
            userId: profile._id
        });

        return res.status(200).json({
            status: "success",
            message: "Profile and Admin account created successfully!",
            id: profile._id
        });

    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ status: "error", message: error.message });
    }
};


export const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        let profile;
        if (id && id !== "undefined" && id.length === 24) { 
            profile = await profileModel.findById(id);
        } else if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            profile = await profileModel.findOne({ email: decoded.email });
        }

        if (!profile) {
            return res.status(404).json({ status: "error", message: "Profile not found" });
        }

        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        
        if (req.imageUrls?.image) {
            updateData.profilePhoto = req.imageUrls.image;
        } else if (req.file) {
            updateData.profilePhoto = req.file.path;
        }

        
        if (updateData.email || updateData.password) {
            const adminUpdate = {};
            if (updateData.email) adminUpdate.email = updateData.email;
            if (updateData.password) adminUpdate.password = updateData.password;

            await AdminModel.updateOne({ userId: id }, { $set: adminUpdate });
        }

        const updatedProfile = await profileModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ status: "error", message: "Profile not found" });
        }

        res.status(200).json({ 
            status: "success", 
            message: "Profile updated successfully", 
            data: updatedProfile 
        });

    } catch (error) {
        console.error("Error updating Profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};