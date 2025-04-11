import mongoose from "mongoose";

const studentsAssignmentSchema = new mongoose.Schema(
   
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

      

        Status: { 
            type: String, 
            default:"active"
          },
         
    },

    { timestamps: true }, 

);

const studentsAssignmentModel = mongoose.model('StudentsAssignment', studentsAssignmentSchema);

export default studentsAssignmentModel 
