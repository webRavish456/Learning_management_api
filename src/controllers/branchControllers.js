import BranchModel from "../models/branchModel.js";


export const postBranch = async (req, res) => {
  try {
    const { branchName, branchLocation, Contact, status } = req.body;

    
    console.log("Backend received data:", req.body);

   
    if (!branchName || !branchLocation || !Contact) {
      return res.status(400).json({ 
        status: "error", 
        message: "Missing fields! Need branchName, branchLocation, and Contact." 
      });
    }

   
    const existingBranch = await BranchModel.findOne({ branchName });
    if (existingBranch) {
      return res.status(400).json({ status: "error", message: "Branch Name already exists" });
    }

    
    const newBranch = await BranchModel.create({
      branchName,
      branchLocation,
      Contact, 
      status: status || "Active"
    });

    return res.status(200).json({ 
      status: "success", 
      message: "Branch created successfully!", 
      data: newBranch 
    });

  } catch (error) {
    console.error("Post Branch Error:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};


export const getBranch = async (req, res) => {
  try {
    const branches = await BranchModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: branches });
  } catch (error) {
    console.error("Get Branch Error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await BranchModel.findById(id);
    if (!branch) {
      return res.status(404).json({ status: "error", message: "Branch not found" });
    }
    res.status(200).json({ status: "success", data: branch });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    
    if (data.branchName) {
      const isExists = await BranchModel.findOne({ 
        branchName: data.branchName, 
        _id: { $ne: id } 
      });
      if (isExists) {
        return res.status(400).json({ status: "error", message: "Branch Name already exists" });
      }
    }

    const updated = await BranchModel.findByIdAndUpdate(
      id, 
      { $set: data }, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: "error", message: "Branch not found" });
    }

    res.status(200).json({ 
      status: "success", 
      message: "Branch updated successfully", 
      data: updated 
    });
  } catch (error) {
    console.error("Update Branch Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await BranchModel.findByIdAndDelete(id);
    
    if (!deletedBranch) {
      return res.status(404).json({ status: "error", message: "Branch not found" });
    }

    res.status(200).json({ 
      status: "success", 
      message: "Branch deleted successfully" 
    });
  } catch (error) {
    console.error("Delete Branch Error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};