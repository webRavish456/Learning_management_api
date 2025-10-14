import AttendanceRequest from "../models/attendanceRequest.js";

// ✅ Create new attendance request
export const createAttendanceRequest = async (req, res) => {
  try {
    const { Profile, PunchedIn, PunchOut, RequestType, TotalHours, Status } = req.body;

    const newRequest = new AttendanceRequest({
      Profile,
      PunchedIn,
      PunchOut,
      RequestType,
      TotalHours,
      Status,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({
      success: true,
      message: "Attendance request created successfully",
      data: savedRequest,
    });
  } catch (error) {
    console.error("Error creating attendance request:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Get all attendance requests
export const getAllAttendanceRequests = async (req, res) => {
  try {
    const requests = await AttendanceRequest.find().populate("Profile", "name email");
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching attendance requests", error });
  }
};

// ✅ Get attendance request by ID
export const getAttendanceRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AttendanceRequest.findById(id).populate("Profile", "name email");

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching request", error });
  }
};

// ✅ Update attendance request
export const updateAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await AttendanceRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating attendance request", error });
  }
};

// ✅ Delete attendance request
export const deleteAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await AttendanceRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting attendance request", error });
  }
};
