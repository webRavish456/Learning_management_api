import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNO: {
      type: Number,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

const staffmodel = mongoose.model("staff", staffSchema);
export default staffmodel;
