import multer from "multer";
import TeacherModel from "../models/teacherModel.js";


export const postTeacher = async (req, res) => {
  
  const ContentType = req.headers["content-type"];
     
  if (ContentType && ContentType.includes("multipart/form-data"))  {

  
      try {
        const {
          teacherName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails,
          bankDetails
        } = req.body;
    
   
   const parsedBankDetails = JSON.parse(bankDetails);

   const parsecompanyDetails = JSON.parse(companyDetails)

 
        if (
          !teacherName ||
          !gender ||
          !dob ||
          !mobileNumber ||
          !emailId ||
          !experience ||
          !qualification ||
          !address ||
          !parsecompanyDetails.branchName ||
          !parsecompanyDetails.courseName ||
          !parsecompanyDetails.salary ||
          !parsecompanyDetails.joiningDate ||
          !parsedBankDetails.accountHolderName ||
          !parsedBankDetails.accountNumber ||
          !parsedBankDetails.bankName ||
          !parsedBankDetails.ifscCode ||
          !parsedBankDetails.branch ||
          !parsedBankDetails.branchLocation ||
          !req.imageUrls?.resumeCertificate ||
          !req.imageUrls?.highestQualificationCertificate ||
          !req.imageUrls?.panCard ||
          !req.imageUrls?.aadharCard
        ) {
          return res.status(400).json({ status: "error", message: "All fields are required" });
        }
     

      const existingData = await TeacherModel.findOne({
        $or: [{ mobileNumber }, { emailId }]
      });
      

      if (existingData) {
        if (existingData.emailId === emailId) {
          return res.status(400).json({ status: "error", message: " Email Id already exists" });
        }
        if (existingData.mobileNumber === mobileNumber) {
          return res.status(400).json({ status: "error", message: "Mobile Number already exists" });
        }
      }

      const documents = {
        resumeCertificate: req.imageUrls?.resumeCertificate || null,
        highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate || null,
        panCard: req.imageUrls?.panCard || null,
        aadharCard: req.imageUrls?.aadharCard || null,
      };

        const newTeacher = await TeacherModel.create({
          teacherName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
         companyDetails: {
          branchName :parsecompanyDetails.branchName,
          courseName:parsecompanyDetails.courseName,
          salary:parsecompanyDetails.salary,
          joiningDate:parsecompanyDetails.joiningDate,
       },
          documents,
          bankDetails: {
            accountHolderName:parsedBankDetails.accountHolderName,
            accountNumber:parsedBankDetails.accountNumber,
            bankName:parsedBankDetails.bankName,
            ifscCode:parsedBankDetails.ifscCode,
            branch:parsedBankDetails.branch,
            branchLocation:parsedBankDetails.branchLocation
          }
        });

        res.status(200).json({ status: "success", message: "Teacher created successfully!" });
      } catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
 
  }
};


  export const getTeacher = async (req, res) => {
    try {
      const teachers= await TeacherModel.find();

      res.status(200).json({ status: "success", data: teachers });
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params; 

    const teacher = await TeacherModel.findById(id); 

    if (!teacher) {
      return res.status(404).json({ status: "error", message: "Teacher Details not found" });
    }

    res.status(200).json({ status: "success", data: teacher });
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


 export const updateTeacher = async (req, res) => {

    const ContentType = req.headers["content-type"];

    if (ContentType && ContentType.includes("multipart/form-data")) {

   
      try {

        const { id } = req.params;
        
        const {
          teacherName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails,
          bankDetails, 
        } = req.body;
      
   
   const parsedBankDetails = JSON.parse(bankDetails);

   const parsecompanyDetails = JSON.parse(companyDetails)

   const teacher = await TeacherModel.findById(id);


   const documents = {
    resumeCertificate: req.imageUrls?.resumeCertificate ?? teacher.documents?.resumeCertificate ?? null,
    highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate ?? teacher.documents?.highestQualificationCertificate ?? null,
    panCard: req.imageUrls?.panCard ?? teacher.documents?.panCard ?? null,
    aadharCard: req.imageUrls?.aadharCard ?? teacher.documents?.aadharCard ?? null,
  };
  
  const existingData = await TeacherModel.find({ _id: { $ne: id } });

  const isMobileExists = existingData.some((doc) => doc.mobileNumber == mobileNumber);
  if (isMobileExists) {
    return res.status(400).json({ status: "error", message: "This mobile number is already registered." });
  }
  
  const isEmailExists = existingData.some((doc) => doc.emailId === emailId);
  if (isEmailExists) {
    return res.status(400).json({ status: "error", message: "This email Id is already registered." });
  }
  

    const updateTeacher = await TeacherModel.updateOne(
      { _id: id },
      {
        $set: {
          teacherName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails: {
            branchName: parsecompanyDetails.branchName,
            courseName: parsecompanyDetails.courseName,
            salary: parsecompanyDetails.salary,
            joiningDate: parsecompanyDetails.joiningDate,
          },
          documents,
          bankDetails: {
            accountHolderName: parsedBankDetails.accountHolderName,
            accountNumber: parsedBankDetails.accountNumber,
            bankName: parsedBankDetails.bankName,
            ifscCode: parsedBankDetails.ifscCode,
            branch: parsedBankDetails.branch,
            branchLocation: parsedBankDetails.branchLocation,
          }
        }
      }
    );

    if (!updateTeacher) {
      return res.status(404).json({ status: "error", message: "Teacher Details not found" });
    }
    
    res.status(200).json({ status: "success", message: "Teacher Details updated successfully"});

  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
   }

  }
};


export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await TeacherModel.deleteOne({ _id: id });
     
    if (deletedTeacher.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "Teacher Details are not found" });
    }

    res.status(200).json({ status: "success", message: "Teacher Details deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
  
};