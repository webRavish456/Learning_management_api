import mongoose from "mongoose";

const certificatesSchema = new mongoose.Schema(

  {
    studentName: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    certificates: {
      type: String,
    },
    status: {
      type: String,
      default: "Active"
    }
  },

  { timestamps: true },

);

const CertificatesModel = mongoose.model('Certificates', certificatesSchema);

export default CertificatesModel