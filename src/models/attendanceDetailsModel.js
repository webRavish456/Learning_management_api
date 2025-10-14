import mongoose  from "mongoose";
const attendanceDetailsSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        date:{
            type:Date,
            required:true,
            default:Date.now
        },
        status:{
            type:String,
            enum:['present','Absent','Half-day','Leave'],
            requird:true
        },

        checkInTime:{
            type:Date,
        },
        checkOutTime:{
            type:Date
        },
        notes:{
            type:String
        },
        

    });
    const attendanceDetails = mongoose.model('Attendance',attendanceDetailsSchema);
    export default attendanceDetails; 
