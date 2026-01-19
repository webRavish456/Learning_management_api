import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        profilePhoto: { 
          type: String,  
          default: "" 
        },

        name: { 
          type: String, 
          required: [true, "Name is required"],
          trim: true 
        },

        mobileNo: { 
          type: String,  
          required: [true, "Mobile number is required"],
          unique: true 
        },

        email: { 
          type: String, 
          required: [true, "Email is required"],
          unique: true, 
          lowercase: true, 
          trim: true
        },

        dob: { 
          type: Date, 
          required: [true, "Date of Birth is required"] 
        },

        gender: { 
            type: String,
            enum: ["male", "female", "other"], 
            default: "male"
          },

        address: { 
            type: String, 
            required: [true, "Address is required"] 
          },
       
        password: { 
          type: String, 
          required: [true, "Password is required"],
          minlength: 6 
        },
          
    },
    { timestamps: true }
);

const ProfileModel = mongoose.model('profile', ProfileSchema);

export default ProfileModel;