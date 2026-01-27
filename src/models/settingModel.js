import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
    {
       
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile', 
            required: true,
            unique: true
        },

        
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