import TeacherModel from "../models/teacherModel.js";


export const postTeacher = async (req, res) => {
  try {
    const {
      teacherName, gender, dob, mobileNumber, emailId,
      experience, qualification, address,
      companyDetails, bankDetails
    } = req.body;

    let parsedBank = {};
    let parsedCompany = {};
    try {
      parsedBank = typeof bankDetails === 'string' ? JSON.parse(bankDetails) : (bankDetails || {});
      parsedCompany = typeof companyDetails === 'string' ? JSON.parse(companyDetails) : (companyDetails || {});
    } catch (e) {
      console.log("Parsing company/bank details failed, using defaults");
    }

    if (!teacherName || !emailId || !mobileNumber) {
      return res.status(400).json({ status: "error", message: "Name, Email and Mobile are required!" });
    }

    const existingData = await TeacherModel.findOne({
      $or: [{ mobileNumber }, { emailid: emailId }]
    });

    if (existingData) {
      const field = existingData.emailid === emailId ? "Email" : "Mobile Number";
      return res.status(400).json({ status: "error", message: `${field} already exists` });
    }

    const newTeacher = await TeacherModel.create({
      teacherName,
      gender: gender || "Male",
      dob: dob || new Date("1995-01-01"),
      mobileNumber: Number(mobileNumber),
      emailid: emailId,
      experience: experience || "0",
      qualification: qualification || "NA",
      address: address || "NA",
      companyDetails: {
        branchName: parsedCompany.branchName || "Main Branch",
        courseName: parsedCompany.courseName || "General",
        salary: Number(parsedCompany.salary) || 0,
        joiningDate: parsedCompany.joiningDate || new Date(),
      },
      documents: {
        resumeCertificate: req.imageUrls?.resumeCertificate || "no-file.pdf",
        highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate || "no-file.pdf",
        panCard: req.imageUrls?.panCard || "no-file.pdf",
        aadharCard: req.imageUrls?.aadharCard || "no-file.pdf",
      },
      bankDetails: {
        accountHolderName: parsedBank.accountHolderName || teacherName,
        accountNumber: Number(parsedBank.accountNumber) || 0,
        bankName: parsedBank.bankName || "NA",
        ifscCode: parsedBank.ifscCode || "NA",
        branch: parsedBank.branch || "NA",
        branchLocation: parsedBank.branchLocation || "NA"
      },
      status: "Active"
    });

    res.status(200).json({ status: "success", message: "Teacher created successfully!", data: newTeacher });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const getTeacher = async (req, res) => {
  try {
    const teachers = await TeacherModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: teachers });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findById(id);
    if (!teacher) return res.status(404).json({ status: "error", message: "Not found" });
    res.status(200).json({ status: "success", data: teacher });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await TeacherModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: "success", message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await TeacherModel.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};