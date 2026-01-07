import multer from "multer";

const storage = multer.memoryStorage();

const uploadLeaveStatus = multer({ storage: storage });

export default uploadLeaveStatus;
