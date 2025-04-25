import mongoose from "mongoose";

const documentSharingSchema = new mongoose.Schema(
   
  {
  
    courseTitle: { 
      type: String, 
      required: true,
    },
  
    courseDescription: { 
      type: String, 
      required: true,
    },
  
    teacher: { 
      type: String, 
      required: true,
    },

    document: {
        type: String, 
    },

    status: { 
      type: String, 
      default: "Active",
    },
  },

  { timestamps: true }
  
);

const DocumentSharingModel = mongoose.model('DocumentSharing', documentSharingSchema);

export default DocumentSharingModel