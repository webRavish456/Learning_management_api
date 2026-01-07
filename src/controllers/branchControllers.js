
  import multer from "multer";
import BranchModel from "../models/branchModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const saveBranchData = async (req, res, data) => {
  try {
    const { branchName, branchLocation, Contact, status } = data;

 
    console.log("Saving Data:", data);

   
    if (!branchName || !branchLocation || !Contact||!status) {
      return res.status(400).json({ 
        status: "error", 
        message: "All fields (branchName, branchLocation, Contact, status) are required" 
      });
    }

    const existingBranch = await BranchModel.findOne({ branchName });
    if (existingBranch) {
      return res.status(400).json({ status: "error", message: "Branch Name already exists" });
    }

    await BranchModel.create({ branchName, branchLocation, Contact, status });
    return res.status(200).json({ status: "success", message: "Branch created successfully!" });
  } catch (error) {
    console.error("Post Branch Error:", error);
    return res.status(500).json({ status: "error", message: error.message }); 
  }
};


export const postBranch = async (req, res) => {
  const contentType = req.headers["content-type"] || "";

  
  if (contentType.includes("multipart/form-data")) {
    upload.none()(req, res, (err) => {
      if (err) return res.status(500).json({ status: "error", message: "Form parsing error" });
      saveBranchData(req, res, req.body);
    });
  } else {
   
    saveBranchData(req, res, req.body);
  }
};


export const getBranch = async (req, res) => {
  try {
    const branches = await BranchModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: branches });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// --- 3. GET BRANCH BY ID ---
export const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await BranchModel.findById(id);
    if (!branch) return res.status(404).json({ status: "error", message: "Branch not found" });
    res.status(200).json({ status: "success", data: branch });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// --- 4. UPDATE BRANCH ---
export const updateBranch = async (req, res) => {
  const contentType = req.headers["content-type"] || "";

  const performUpdate = async (data) => {
    try {
      const { id } = req.params;
      if (data.branchName) {
        const isExists = await BranchModel.findOne({ branchName: data.branchName, _id: { $ne: id } });
        if (isExists) return res.status(400).json({ status: "error", message: "Branch Name already exists" });
      }
      const updated = await BranchModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ status: "error", message: "Branch not found" });
      res.status(200).json({ status: "success", message: "Branch updated successfully", data: updated });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  if (contentType.includes("form-data")) {
    upload.none()(req, res, (err) => {
      if (err) return res.status(500).json({ status: "error", message: "Error parsing data" });
      performUpdate(req.body);
    });
  } else {
    performUpdate(req.body);   
  }
};

export const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await BranchModel.findByIdAndDelete(id);
    if (!deletedBranch) return res.status(404).json({ status: "error", message: "Branch not found" });
    res.status(200).json({ status: "success", message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
 };  