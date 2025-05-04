import mongoose from "mongoose";

const allAssignmentSchema = new mongoose.Schema(
   
    {
        assignmentTitle: { 
          type: String, 
          required: true, 
          
        },

        course: { 
          type: String, 
          required: true ,
          
        },
      teacher: { 
          type: String, 
          required: true, 
          
        },

        dueDate: { 
            type:Date, 
            required: true, 
          
          },

        status: { 
            type: String, 
            default:"Active"
          },
         
    },

    { timestamps: true }, 

);

const AllAssignmentModel = mongoose.model('AllAssignment', allAssignmentSchema);

export default AllAssignmentModel 
