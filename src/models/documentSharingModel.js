import mongoose from "mongoose";

const documentSharingSchema = new mongoose.Schema(
   
  {
  
    topic: { 
      type: String, 
      required: true,
    },
  
    topicDescription: { 
      type: String, 
      required: true,
    },

    course: {
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
  },

  { timestamps: true }
  
);

const DocumentSharingModel = mongoose.model('DocumentSharing', documentSharingSchema);

export default DocumentSharingModel