import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
   
    {
        branchName: { 
          type: String, 
          required: true, 
         
        },

        branchLocation: { 
          type: String, 
          required: true ,
         
        },
        status: { 
          type: String, 
          default:"Active"
        },
    },

    { timestamps: true }, 

);

const BranchModel = mongoose.model('Branch', branchSchema);

export default BranchModel 
