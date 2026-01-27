import RoleModel from "../models/roleModel.js";

/* ================= CREATE ROLE ================= */
export const createRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    if (!roleName || !roleName.trim()) {
      return res.status(400).json({
        status: "error",
        message: "roleName required",
      });
    }

    const role = await RoleModel.create({
      roleName: roleName.trim(),
      permissions: permissions || [],
      status: true,
    });

    return res.status(201).json({
      status: "success",
      data: role,
    });
  } catch (err) {
    console.error("CREATE ROLE ERROR 👉", err);

    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

/* ================= GET ALL ROLES ================= */
export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data: roles,
    });
  } catch (err) {
    console.error("GET ROLES ERROR 👉", err);

    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

/* ================= UPDATE ROLE ================= */
export const updateRole = async (req, res) => {
  try {
    const { roleName, permissions, status } = req.body;

    const updatedRole = await RoleModel.findByIdAndUpdate(
      req.params.id,
      {
        ...(roleName && { roleName: roleName.trim() }),
        ...(permissions && { permissions }),
        ...(status !== undefined && { status }),
      },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        status: "error",
        message: "Role not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: updatedRole,
    });
  } catch (err) {
    console.error("UPDATE ROLE ERROR 👉", err);

    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

/* ================= DELETE ROLE ================= */
export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await RoleModel.findByIdAndDelete(req.params.id);

    if (!deletedRole) {
      return res.status(404).json({
        status: "error",
        message: "Role not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Role deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ROLE ERROR 👉", err);

    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
