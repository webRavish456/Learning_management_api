import mongoose from "mongoose";

const studentListSchema = new mongoose.Schema(
  {
   
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      index: true 
    },
    
    emailId: {
      type: String,
      required: [true, "Email ID is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    
      validate: {
        validator: function(v) {
          return v.length >= 10;
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    
    dob: {
      type: String, 
      required: [true, "Date of birth is required"]
    },
   
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: '{VALUE} is not supported'
      },
      required: true
    },
   
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    },
    
    enrollmentDate: {
      type: String,
      required: [true, "Enrollment date is required"]
    },
  
    course: {
      required: [true, "Course selection is required"],
      index: true
    },
   
    status: {
      type: String,
      enum: ["Ongoing", "Graduated", "Dropped", "Active", "Inactive"], 
      default: "Ongoing"
    },
  },
  { 
  }
);


studentListSchema.index({ studentName: 'text', emailId: 'text' });

const StudentListModel = mongoose.models.StudentList || mongoose.model('StudentList', studentListSchema);

export default StudentListModel;