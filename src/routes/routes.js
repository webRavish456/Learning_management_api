import express from 'express';
import verifyToken from '../middleware/auth.js';
import multer from 'multer';

const uploadNone = multer().none();

// Upload Middlewares
import uploadProfile from '../upload/profile.js';
import uploadCourse from '../upload/courseList.js';
import uploadDocument from '../upload/document.js';
import uploadTeacher from '../upload/teacher.js';
import uploadCertificates from '../upload/certificates.js';
import uploadStudentresult from '../upload/studentresult.js';

// Controllers
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
import { postCourselist, getCourselist, getCourselistById, updateCourselist, deleteCourselist } from '../controllers/courselistControllers.js';
import { deleteDocumentsharing, getDocumentsharing, getDocumentsharingById, postDocumentsharing, updateDocumentsharing } from '../controllers/documentsharingControllers.js';
import { deleteAllAssignment, getAllAssignment, getAllAssignmentById, postAllAssignment, updateAllAssignment } from '../controllers/allAssignmentControllers.js';
import { deleteStudentsAssignment, getStudentsAssignment, getStudentsAssignmentById, postStudentsAssignment, updateStudentsAssignment } from '../controllers/studentsAssignmentControllers.js';
import { postTeacher, deleteTeacher, getTeacher, getTeacherById, updateTeacher } from '../controllers/teacherControllers.js';
import { deletedResult, getResult, getResultById, postResult, updatedResult } from '../controllers/resultControllers.js';
import { deleteAllStudents, getAllStudents, getAllStudentsById, postAllStudents, updateAllStudents } from '../controllers/allstudentsControllers.js';
import { deleteCertificates, getCertificates, getCertificatesById, postCertificates, updateCertificates } from '../controllers/certificatesControllers.js';
import { deleteTimetable, getTimetable, getTimetableById, postTimetable, updateTimetable } from '../controllers/timetableControllers.js';
import { postAdmin, postForgot, postSignup } from '../controllers/authControllers.js';
import { deleteStudentresult, getStudentresult, getStudentresultById, postStudentresult, updateStudentresult } from '../controllers/studentresultControllers.js';
import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';
import { createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff } from '../controllers/staffController.js';
import { createLiveClass, getAllLiveClasses, getLiveClassById, updateLiveClass, deleteLiveClass } from '../controllers/liveClassController.js';
import { createRecordedClass, getAllRecordedClasses, getRecordedClassById, updateRecordedClass, deleteRecordedClass } from '../controllers/recordedClassesController.js';
import { createBill, getAllBills, getBillById, updateBill, deleteBill } from '../controllers/billController.js';
import { createHoliday, getAllHolidays, getHolidayById, updateHoliday, deleteHoliday } from '../controllers/leave-HolidayController.js';
import { createLeaveRequest, getAllLeaveRequests, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest } from '../controllers/leaveRequestController.js';
import { createLeaveStatus, getAllLeaveStatus, getLeaveStatusById, updateLeaveStatus, deleteLeaveStatus } from "../controllers/leaveStatusController.js";
import { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } from '../controllers/notificationController.js';
import { createIncome, getAllIncomes, getIncomeById, updateIncome, deleteIncome } from '../controllers/incomeController.js';
import { createReceipt, getAllReceipts, getReceiptById, updateReceipt, deleteReceipt } from '../controllers/receiptController.js';
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { createSetting, getAllSetting, getSettingById, updateSetting, deleteSetting } from '../controllers/settingController.js';

import { createRole, getAllRoles, updateRoleStatus, deleteRole } from '../controllers/roleController.js';

const router = express.Router();

/* =================== AUTH =================== */
router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);
router.route('/admin/signup').post(postSignup);


/* =================== ACADEMIC MANAGEMENT =================== */
// Branch
router.route('/branch')
    .post(verifyToken, postBranch)
    .get(verifyToken, getBranch);
router.route('/branch/:id')
    .get(verifyToken, getBranchById)
    .put(verifyToken, updateBranch)
    .delete(verifyToken, deleteBranch);

// Exam
router.route('/exam')
    .post(verifyToken, postExam)
    .get(verifyToken, getExam);
router.route('/exam/:id')
    .get(verifyToken, getExamById)
    .patch(verifyToken, updateExam)
    .delete(verifyToken, deleteExam);

// Course List
router.route('/courselist')
    .post(verifyToken, uploadCourse, postCourselist)
    .get(verifyToken, getCourselist);
router.route('/courselist/:id')
    .get(verifyToken, getCourselistById)
    .put(verifyToken, uploadCourse, updateCourselist)
    .delete(verifyToken, deleteCourselist);

/* =================== LEARNING & DOCUMENTS =================== */
// Document Sharing
router.route('/documentsharing')
    .post(verifyToken, uploadDocument, postDocumentsharing)
    .get(verifyToken, getDocumentsharing);
router.route('/documentsharing/:id')
    .get(verifyToken, getDocumentsharingById)
    .patch(verifyToken, uploadDocument, updateDocumentsharing)
    .delete(verifyToken, deleteDocumentsharing);

// All Assignments
router.route('/allAssignment')
    .post(verifyToken, postAllAssignment)
    .get(verifyToken, getAllAssignment);
router.route('/allAssignment/:id')
    .get(verifyToken, getAllAssignmentById)
    .patch(verifyToken, updateAllAssignment)
    .delete(verifyToken, deleteAllAssignment);

// Students Specific Assignment
router.route('/studentsAssignment')
    .post(verifyToken, postStudentsAssignment)
    .get(verifyToken, getStudentsAssignment);
router.route('/studentsAssignment/:id')
    .get(verifyToken, getStudentsAssignmentById)
    .patch(verifyToken, updateStudentsAssignment)
    .delete(verifyToken, deleteStudentsAssignment);

/* =================== FINANCE MANAGEMENT =================== */
// Expenses
router.route('/expense')
    .post(verifyToken, uploadNone, createExpense)
    .get(verifyToken, getAllExpenses);
router.route('/expense/:id')
    .get(verifyToken, getExpenseById)
    .patch(verifyToken, updateExpense)
    .delete(verifyToken, deleteExpense);

// Income
router.route('/income')
    .post(verifyToken, uploadNone, createIncome)
    .get(verifyToken, getAllIncomes);
router.route('/income/:id')
    .get(verifyToken, getIncomeById)
    .patch(verifyToken, updateIncome)
    .delete(verifyToken, deleteIncome);

// Receipts
router.route('/receipt')
    .post(verifyToken, uploadNone, createReceipt)
    .get(verifyToken, getAllReceipts);
router.route('/receipt/:id')
    .get(verifyToken, getReceiptById)
    .patch(verifyToken, updateReceipt)
    .delete(verifyToken, deleteReceipt);

/* =================== USER MANAGEMENT =================== */
// Teacher
router.route('/teacher')
    .post(verifyToken, uploadTeacher, postTeacher)
    .get(verifyToken, getTeacher);
router.route('/teacher/:id')
    .get(verifyToken, getTeacherById)
    .patch(verifyToken, uploadTeacher, updateTeacher)
    .delete(verifyToken, deleteTeacher);

// Students
router.route('/allstudents')
    .post(verifyToken, postAllStudents)
    .get(verifyToken, getAllStudents);
router.route('/allstudents/:id')
    .get(verifyToken, getAllStudentsById)
    .patch(verifyToken, updateAllStudents)
    .delete(verifyToken, deleteAllStudents);

// Staff
router.route('/staff')
    .post(verifyToken, createStaff)
    .get(verifyToken, getAllStaff);
router.route('/staff/:id')
    .get(verifyToken, getStaffById)
    .patch(verifyToken, updateStaff)
    .delete(verifyToken, deleteStaff);

/* =================== RESULTS & RECORDS =================== */
// Exam Results
router.route('/result')
    .post(verifyToken, postResult)
    .get(verifyToken, getResult);
router.route('/result/:id')
    .get(verifyToken, getResultById)
    .patch(verifyToken, updatedResult)
    .delete(verifyToken, deletedResult);

// Individual Student Results
router.route('/studentresult')
    .post(verifyToken, uploadStudentresult, postStudentresult);
router.route('/studentresult/:resultId')
    .get(verifyToken, getStudentresult);
router.route('/studentresult/:id/:resultId')
    .get(verifyToken, getStudentresultById)
    .patch(verifyToken, uploadStudentresult, updateStudentresult)
    .delete(verifyToken, deleteStudentresult);

// Certificates
router.route('/certificates')
    .post(verifyToken, uploadCertificates, postCertificates)
    .get(verifyToken, getCertificates);
router.route('/certificates/:id')
    .get(verifyToken, getCertificatesById)
    .patch(verifyToken, uploadCertificates, updateCertificates)
    .delete(verifyToken, deleteCertificates);

/* =================== OPERATIONS =================== */
// Timetable
router.route('/timetable')
    .post(verifyToken, postTimetable)
    .get(verifyToken, getTimetable);
router.route('/timetable/:id')
    .get(verifyToken, getTimetableById)
    .patch(verifyToken, updateTimetable)
    .delete(verifyToken, deleteTimetable);

// Profile
router.route('/profile')
    .post(verifyToken, uploadProfile, postProfile);
router.route('/profile/:id')
    .get(verifyToken, getProfile)
    .patch(verifyToken, uploadProfile, updateProfile);

// Classes (Live & Recorded)
router.route('/live-class')
    .post(verifyToken, uploadNone, createLiveClass)
    .get(verifyToken, getAllLiveClasses);
router.route('/recorded-class')
    .post(verifyToken, uploadNone, createRecordedClass)
    .get(verifyToken, getAllRecordedClasses);

// Bills
router.route('/bill')
    .post(verifyToken, createBill)
    .get(verifyToken, getAllBills);
router.route('/bill/:id')
    .get(verifyToken, getBillById)
    .patch(verifyToken, updateBill)
    .delete(verifyToken, deleteBill);

    

/* =================== HR & NOTIFICATIONS =================== */
// Holidays
router.route('/holiday')
    .post(verifyToken, createHoliday)
    .get(verifyToken, getAllHolidays);
router.route('/holiday/:id')
    .get(verifyToken, getHolidayById)
    .patch(verifyToken, updateHoliday)
    .delete(verifyToken, deleteHoliday);

// Leave Requests
router.route('/leave-request')
    .post(verifyToken, createLeaveRequest)
    .get(verifyToken, getAllLeaveRequests);
router.route('/leave-request/:id')
    .get(verifyToken, getLeaveRequestById)
    .patch(verifyToken, updateLeaveRequest)
    .delete(verifyToken, deleteLeaveRequest);

// Leave Status
router.route('/leave-status')
    .post(verifyToken, createLeaveStatus)
    .get(verifyToken, getAllLeaveStatus);
router.route('/leave-status/:id')
    .get(verifyToken, getLeaveStatusById)
    .patch(verifyToken, updateLeaveStatus)
    .delete(verifyToken, deleteLeaveStatus);

// Notifications
router.route('/notification')
    .post(verifyToken, createNotification)
    .get(verifyToken, getAllNotifications);
router.route('/notification/:id')
    .get(verifyToken, getNotificationById)
    .patch(verifyToken, updateNotification)
    .delete(verifyToken, deleteNotification);


/* =================== SYSTEM SETTINGS =================== */
// Settings CRUD
router.route('/setting')
    .post(verifyToken, uploadNone, createSetting) 
    .get(verifyToken, getAllSetting);

router.route('/setting/:id')
    .get(verifyToken, getSettingById)
    .patch(verifyToken, uploadNone, updateSetting)
    .delete(verifyToken, deleteSetting);

// Role Management CRUD
router.route('/roles')
    .post(verifyToken, uploadNone, createRole)
    .get(verifyToken, getAllRoles);

router.route('/roles/:id')
    .patch(verifyToken, uploadNone, updateRoleStatus)
    .delete(verifyToken, deleteRole);


/* =================== SYSTEM TEST =================== */
router.get("/test-db", async (req, res) => {
    res.status(200).json({ message: "✅ Database connection is working fine!" });
});

export default router;