import multer from "multer";
import DocumentSharingModel from "../models/documentSharingModel.js";


export const postDocumentsharing = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {

  
    try {
  
      const {courseTitle, courseDescription, teacher} = req.body;

  
      if (!courseTitle || !courseDescription ||  !teacher) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

     const document =  req.imageUrls?.image || null

    //   const [day, month, year] = examDate.split("/");

    //   const now = new Date();
    //   const hours = now.getHours();
    //   const minutes = now.getMinutes();
    //   const seconds = now.getSeconds();
      
    //   const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     
      const newDocumentsharing = await DocumentSharingModel.create({ courseTitle, courseDescription, teacher, document });

      res.status(200).json({ status: "success", message: "Document sharing Detail created successfully!" });
  
    } catch (error) {
      console.error("Error creating Documentsharing:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
    
  }
  
  };


  export const getDocumentsharing = async (req, res) => {
    try {
      const Documentsharing = await DocumentSharingModel.find();
  
      if (Documentsharing.length === 0) {
        return res.status(404).json({ status: "error", message: "Doc Details not found" });
      }
  
      res.status(200).json({ status: "success", data: Documentsharing });
    } catch (error) {
      console.error("Error fetching Documentsharing:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getDocumentsharingById = async (req, res) => {
    try {
      const { id } = req.params; 

      const Documentsharing = await DocumentSharingModel.findById(id); 
  
      if (!Documentsharing) {
        return res.status(404).json({ status: "error", message: "document sharing Details not found" });
      }
  
      res.status(200).json({ status: "success", data: Documentsharing });
    } catch (error) {
      console.error("Error fetching Documentsharing:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateDocumentsharing = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
   

    

     try {

      const { id } = req.params;
      const updateData = req.body; 

      if(req.imageUrls.image) {
        updateData.document=req.imageUrls.image
      }

    //   if(updateData.pricing)
    //   {
    //     const [day, month, year] = updateData.examDate.split("/");

    //     const now = new Date();
    //     const hours = now.getHours();
    //     const minutes = now.getMinutes();
    //     const seconds = now.getSeconds();
        
    //     const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    //     updateData.examDate=new Date(formattedDate)
    //   }

      const updatedDocumentsharing =  await DocumentSharingModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedDocumentsharing) {
        return res.status(404).json({ status: "error", message: "document sharing Details not found" });
      }
  
      res.status(200).json({ status: "success", message: "document sharing Details updated successfully"});

    } catch (error) {
      console.error("Error updating Documentsharing:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deleteDocumentsharing = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedDocumentsharing = await DocumentSharingModel.deleteOne({ _id: id });
       
      if (!deletedDocumentsharing) {
        return res.status(404).json({ status: "error", message: "document sharing Details are not found" });
      }
  
      res.status(200).json({ status: "success", message: "document sharing Details deleted successfully" });
    } catch (error) {
      console.error("Error deleting document sharing:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };