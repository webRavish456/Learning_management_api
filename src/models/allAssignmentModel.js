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
            type:String, 
            required: true, 
          
          },

      totalCompletion: { 
            type: String, 
            required: true, 
          
          },

        Status: { 
            type: String, 
            default:"active"
          },
         
    },

    { timestamps: true }, 

);

const AllAssignmentModel = mongoose.model('AllAssignment', allAssignmentSchema);

export default AllAssignmentModel 
