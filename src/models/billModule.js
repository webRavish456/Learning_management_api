import mongoose from "mongoose";
const billSchema = new mongoose.Schema(
    {
        studentName:{
            type:String,
            required:true,
        },

        mobileNo:{
            type:Number,
            required:true,
        },

        courseAsssigned:{
            type:String,
        },

        admissionDate:{
            type:Date,
            required:true,
        },

        tax:{
            type:Number,
            required:true,
        },

        discount:{
            type:Number,
            required:true,
        },

        paidAmount:{
            type:Number,
            required:true,
        },
        dueAmount:{
            type:Number,

        },
        totalAmount:{
            type:Number,
            required:true,

        },

        status:{
            type:String,

        }
 

         

    }
);

const bill=mongoose.model("biill" , billSchema );
export default bill;
