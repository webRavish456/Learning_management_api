import multer from "multer";
import TeacherModel from "../models/teacherModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postTeacher = async (req, res) => {
  const ContentType = req.headers["content-type"];
     
  console.log("ContentType",ContentType)
  if (ContentType && ContentType.includes("application/json")) {
    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error handling form data" });
      }
 console.log(req.body)

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
          branchName,
          courseName,
          salary,
          joiningDate,
          resumeCertificate,
          highestQualificationCertificate,
          panCard,
          aadharCard,
          accountHolderName,
          accountNumber,
          bankName,
          ifscCode,
          branch,
          branchLocation,
        } = req.body;

        if (
          !teacherName ||
          !gender ||
          !dob ||
          !mobileNumber ||
          !emailId ||
          !experience ||
          !qualification ||
          !address ||
          !branchName ||
          !courseName ||
          !salary ||
          !joiningDate ||
          !documents.resumeCertificate ||
          !documents.highestQualificationCertificate ||
          !documents.panCard ||
          !documents.aadharCard ||
          !bankDetails.accountHolderName ||
          !bankDetails.accountNumber ||
          !bankDetails.bankName ||
          !bankDetails.ifscCode ||
          !bankDetails.branch ||
          !bankDetails.branchLocation
        ) {
          return res.status(400).json({ status: "error", message: "All fields are required" });
        }

        const [day, month, year] = examDate.split("/");

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      const formattedDate = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     

        const newTeacher = await TeacherModel.create({
          teacherName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          branchName,
          courseName,
          salary,
          joiningDate,
          document: {
            resumeCertificate,
            highestQualificationCertificate,
            panCard,
            aadharCard,
          },
          bankDetails: {
            accountHolderName,
            accountNumber,
            bankName,
            ifscCode,
            branch,
            branchLocation,
          },
        });

        res.status(200).json({ status: "success", message: "Teacher created successfully!" });
      } catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });
  }
};
