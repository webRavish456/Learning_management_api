import mongoose from "mongoose";

const studentListSchema = new mongoose.Schema(
  {
    // 1) Student Name
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      index: true // Search optimize karne ke liye
    },
    // 2) Email
    emailId: {
      type: String,
      required: [true, "Email ID is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // 3) Mobile
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      // Validation: Kam se kam 10 digits hone chahiye
      validate: {
        validator: function(v) {
          return v.length >= 10;
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    // 4) Date of Birth
    dob: {
      type: String, // Date format consistency ke liye string (YYYY-MM-DD)
      required: [true, "Date of birth is required"]
    },
    // 5) Gender
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: '{VALUE} is not supported'
      },
      required: true
    },
    // 6) Address
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    },
    // 7) Enrollment Date
    enrollmentDate: {
      type: String,
      required: [true, "Enrollment date is required"]
    },
    // 8) Course
    course: {
      type: String, // Aap chahen toh ise Course Model se link (ObjectId) bhi kar sakte hain
      required: [true, "Course selection is required"],
      index: true
    },
    // 9) Status
    status: {
      type: String,
      enum: ["Ongoing", "Graduated", "Dropped", "Active", "Inactive"], // Status flexibility
      default: "Ongoing"
    },
  },
  { 
    timestamps: true // 10) Isse 'createdAt' aur 'updatedAt' handle honge
  }
);

// 🔍 Indexing for faster search (Name aur Email par)
studentListSchema.index({ studentName: 'text', emailId: 'text' });

const StudentListModel = mongoose.models.StudentList || mongoose.model('StudentList', studentListSchema);

export default StudentListModel;