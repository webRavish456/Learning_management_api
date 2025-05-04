import mongoose from "mongoose";

const studentsAssignmentSchema = new mongoose.Schema(
   
    {

       studentName: { 
        type: String, 
        required: true, 
        
      },
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
          mobileNumber: { 
            type:Number, 
            required: true, 
          
          },

        status: { 
            type: String, 
            required:true
          },
         
    },

    { timestamps: true }, 

);

const studentsAssignmentModel = mongoose.model('StudentsAssignment', studentsAssignmentSchema);

export default studentsAssignmentModel 
