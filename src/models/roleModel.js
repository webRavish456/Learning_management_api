import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true, 
            trim: true
        },
        permissions: [
            {
                module: { type: String, required: true },
                create: { type: Boolean, default: false },
                read: { type: Boolean, default: false },
                update: { type: Boolean, default: false },
                delete: { type: Boolean, default: false },
            }
        ],
        status: {
            type: Boolean,
            default: true 
        }
    },
    { 
        timestamps: true 
    }
);

const RoleModel = mongoose.model('role', RoleSchema);

export default RoleModel;