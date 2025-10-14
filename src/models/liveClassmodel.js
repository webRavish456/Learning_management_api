import mongoose from "mongoose";   
const liveClassSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },

        description:{
            type:String,
            required:true,
        },

        courseName:{
            type:String,
        },

        teacherName:{
            type:String,
        },

        date:{
            type:Date,
            required:true,
        },

        timing:{
            type:String,
            required:true,
        },

        duration:{
            type:String,
            required:true,
        },
        meetingLink:{
            type:String,
            required:true,
        },
       
    },
    {timestamps:true},
);

const liveClassModel=mongoose.model('liveClass',liveClassSchema);   

export default liveClassModel