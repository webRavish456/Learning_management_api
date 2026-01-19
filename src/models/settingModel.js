import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
    {
        // इसे User या Profile से जोड़ने के लिए
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile', 
            required: true,
            unique: true
        },

        // Notifications Settings
        emailNotifications: {
            type: Boolean,
            default: true
        },
        pushNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: false
        },

        // Security Settings
        twoFactor: {
            type: Boolean,
            default: false
        }
    },
    { 
        timestamps: true 
    }
);

const SettingModel = mongoose.model('setting', SettingSchema);

export default SettingModel;