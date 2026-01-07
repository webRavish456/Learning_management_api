import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      unique: true, // prevent duplicate dates at DB level
    },
  },
  { timestamps: true }
);

// remove _id & __v from JSON responses (optional but clean)
holidaySchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Holiday = mongoose.model("Holiday", holidaySchema);
export default Holiday;
