import RoleModel from "../models/roleModel.js";

// 1. Create Role
export const createRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const newRole = await RoleModel.create({ roleName, permissions });
        res.status(201).json({ status: "success", data: newRole });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// 2. Get All Roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await RoleModel.find();
        res.status(200).json({ status: "success", data: roles });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// 3. Update Status
export const updateRoleStatus = async (req, res) => {
    try {
        const updatedRole = await RoleModel.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.status(200).json({ status: "success", data: updatedRole });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// 4. Delete Role
export const deleteRole = async (req, res) => {
    try {
        await RoleModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "success", message: "Role deleted" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};