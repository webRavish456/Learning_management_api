import SettingModel from "../models/settingModel.js";


export const createSetting = async (req, res) => {
    try {
        const { userId } = req.body;

      
        const existingSetting = await SettingModel.findOne({ userId });
        if (existingSetting) {
            return res.status(400).json({ 
                status: "error", 
                message: "Settings already exist for this user. Use Update instead." 
            });
        }

        const newSetting = await SettingModel.create(req.body);
        res.status(201).json({ 
            status: "success", 
            message: "Settings created successfully", 
            data: newSetting 
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const getAllSetting = async (req, res) => {
    try {
        const settings = await SettingModel.find().populate('userId', 'name email');
        res.status(200).json({ status: "success", data: settings });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const getSettingById = async (req, res) => {
    try {
        const setting = await SettingModel.findById(req.params.id);
        if (!setting) {
            return res.status(404).json({ status: "error", message: "Setting not found" });
        }
        res.status(200).json({ status: "success", data: setting });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const updateSetting = async (req, res) => {
    try {
        const updatedSetting = await SettingModel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedSetting) {
            return res.status(404).json({ status: "error", message: "Setting not found" });
        }

        res.status(200).json({ 
            status: "success", 
            message: "Settings updated successfully", 
            data: updatedSetting 
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const deleteSetting = async (req, res) => {
    try {
        const deletedSetting = await SettingModel.findByIdAndDelete(req.params.id);
        
        if (!deletedSetting) {
            return res.status(404).json({ status: "error", message: "Setting not found" });
        }

        res.status(200).json({ 
            status: "success", 
            message: "Setting deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};