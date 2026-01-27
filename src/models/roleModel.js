import mongoose from "mongoose";

/* ================= PERMISSION SUB-SCHEMA ================= */
const permissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      trim: true,
    },
    create: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // ✅ no extra _id for permissions
);

/* ================= ROLE SCHEMA ================= */
const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true, // ✅ unique now correctly applied
      trim: true,
    },

    permissions: {
      type: [permissionSchema],
      default: [],
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

/* ================= MODEL EXPORT ================= */
const RoleModel = mongoose.model("Role", roleSchema);
export default RoleModel;
