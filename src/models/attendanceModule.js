import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
