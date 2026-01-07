import mongoose from "mongoose";
import dotenv from "dotenv";
import { addAdmin } from "../controllers/adminControllers.js";
import AdminModel from "../models/adminModel.js";
import { seed } from "./seed.js";

dotenv.config(); // load .env file

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully for seeding");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ✅ Create admin function
const createAdmin = async () => {
  try {
    const adminExist = await AdminModel.findOne({ email: "superadmin@gmail.com" });

    if (!adminExist) {
      for (const admin of seed.admins) {
        await addAdmin(admin);
      }
      console.log("✅ Super Admin created successfully.");
    } else {
      console.log("ℹ️ Super Admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating super admin:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

// ✅ Run seeding
const startSeeding = async () => {
  await connectDB();
  await createAdmin();
};

startSeeding();
