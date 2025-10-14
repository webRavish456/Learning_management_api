// import express from 'express'
// import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
// import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
// import { postCourselist } from '../controllers/courselistControllers.js';
// import { getCourselist } from '../controllers/courselistControllers.js';
// import { getCourselistById } from '../controllers/courselistControllers.js';
// import { updateCourselist } from '../controllers/courselistControllers.js';
// import { deleteCourselist } from '../controllers/courselistControllers.js';
// import uploadCourse from '../upload/courseList.js';
// import { deleteDocumentsharing, getDocumentsharing, getDocumentsharingById, postDocumentsharing, updateDocumentsharing } from '../controllers/documentsharingControllers.js';
// import uploadDocument from '../upload/document.js';
// import { deleteAllAssignment, getAllAssignment, getAllAssignmentById, postAllAssignment, updateAllAssignment } from '../controllers/allAssignmentControllers.js';
// import { deleteStudentsAssignment, getStudentsAssignment, getStudentsAssignmentById, postStudentsAssignment, updateStudentsAssignment } from '../controllers/studentsAssignmentControllers.js';
// import { postTeacher } from '../controllers/teacherControllers.js';
// import { deletedResult, getResult, getResultById, postResult, updatedResult } from '../controllers/resultControllers.js';

// import { deleteTeacher, getTeacher, getTeacherById, updateTeacher } from '../controllers/teacherControllers.js';
// import uploadTeacher from '../upload/teacher.js';

// import { deleteAllStudents, getAllStudents, getAllStudentsById, postAllStudents, updateAllStudents } from '../controllers/allstudentsControllers.js';

// import { deleteCertificates, getCertificates, getCertificatesById, postCertificates, updateCertificates } from '../controllers/certificatesControllers.js';

// import { deleteTimetable, getTimetable, getTimetableById, postTimetable, updateTimetable } from '../controllers/timetableControllers.js';

// import uploadCertificates from '../upload/certificates.js';
// import verifyToken from '../middleware/auth.js';
// import { postAdmin, postForgot } from '../controllers/authControllers.js';
// import { deleteStudentresult, getStudentresult, getStudentresultById, postStudentresult, updateStudentresult } from '../controllers/studentresultControllers.js';
// import uploadStudentresult from '../upload/studentresult.js';
// import uploadProfile from '../upload/profile.js';
// import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';



// export const router = express.Router();

// /* verifyToken */

// router.route('/login').post(postAdmin);     //generate token or expire date
// router.route('/forgot').post(postForgot);

// /* branch */

// router.route('/branch').post(verifyToken, postBranch);
// router.route('/branch').get(verifyToken, getBranch);
// router.route('/branch/:id').get(verifyToken, getBranchById);
// router.route('/branch/:id').patch(verifyToken, updateBranch);
// router.route('/branch/:id').delete(verifyToken, deleteBranch);

// /* exam */

// router.route('/exam').post(verifyToken, postExam);
// router.route('/exam').get(verifyToken, getExam);
// router.route('/exam/:id').get(verifyToken, getExamById);
// router.route('/exam/:id').patch(verifyToken, updateExam);
// router.route('/exam/:id').delete(verifyToken, deleteExam);

// /* course */

// router.route('/courselist').post(verifyToken, uploadCourse, postCourselist);
// router.route('/courselist').get(verifyToken, getCourselist);
// router.route('/courselist/:id').get(verifyToken, getCourselistById);
// router.route('/courselist/:id').patch(verifyToken, uploadCourse, updateCourselist);
// router.route('/courselist/:id').delete(verifyToken, deleteCourselist);



// router.route('/documentsharing').post(verifyToken, uploadDocument, postDocumentsharing);
// router.route('/documentsharing').get(verifyToken, getDocumentsharing);
// router.route('/documentsharing/:id').get(verifyToken, getDocumentsharingById);
// router.route('/documentsharing/:id').patch(verifyToken, uploadDocument, updateDocumentsharing);
// router.route('/documentsharing/:id').delete(verifyToken, deleteDocumentsharing);

// /* assignment */

// router.route('/allAssignment').post(verifyToken, postAllAssignment);
// router.route('/allAssignment').get(verifyToken, getAllAssignment);
// router.route('/allAssignment/:id').get(verifyToken, getAllAssignmentById);
// router.route('/allAssignment/:id').patch(verifyToken, updateAllAssignment);
// router.route('/allAssignment/:id').delete(verifyToken, deleteAllAssignment);



// router.route('/studentsAssignment').post(verifyToken, postStudentsAssignment);
// router.route('/studentsAssignment').get(verifyToken, getStudentsAssignment);
// router.route('/studentsAssignment/:id').get(verifyToken, getStudentsAssignmentById);
// router.route('/studentsAssignment/:id').patch(verifyToken, updateStudentsAssignment);
// router.route('/studentsAssignment/:id').delete(verifyToken, deleteStudentsAssignment);

// /* result */

// router.route('/result').post(verifyToken, postResult);
// router.route('/result').get(verifyToken, getResult);
// router.route('/result/:id').get(verifyToken, getResultById);
// router.route('/result/:id').patch(verifyToken, updatedResult);
// router.route('/result/:id').delete(verifyToken, deletedResult);

// /* student result*/ 
// router.route('/studentresult').post(verifyToken, uploadStudentresult, postStudentresult);
// router.route('/studentresult/:resultId').get(verifyToken, getStudentresult);
// router.route('/studentresult/:id/:resultId').get(verifyToken, getStudentresultById);
// router.route('/studentresult/:id/:resultId').patch(verifyToken, uploadStudentresult, updateStudentresult);
// router.route('/studentresult/:id/:resultId').delete(verifyToken, deleteStudentresult);


// /* teacher */

// router.route('/teacher').post(verifyToken, uploadTeacher, postTeacher);
// router.route('/teacher').get(verifyToken, getTeacher);
// router.route('/teacher/:id').get(verifyToken, getTeacherById);
// router.route('/teacher/:id').patch(verifyToken, uploadTeacher, updateTeacher);
// router.route('/teacher/:id').delete(verifyToken, deleteTeacher);

// /* student */

// router.route('/allstudents').post(verifyToken, postAllStudents)
// router.route('/allstudents').get(verifyToken, getAllStudents)
// router.route('/allstudents/:id').get(verifyToken, getAllStudentsById)
// router.route('/allstudents/:id').patch(verifyToken, updateAllStudents)
// router.route('/allstudents/:id').delete(verifyToken, deleteAllStudents)

// /* certificate */

// router.route('/certificates').post(verifyToken, uploadCertificates, postCertificates)
// router.route('/certificates').get(verifyToken, getCertificates)
// router.route('/certificates/:id').get(verifyToken, getCertificatesById)
// router.route('/certificates/:id').patch(verifyToken, uploadCertificates, updateCertificates)
// router.route('/certificates/:id').delete(verifyToken, deleteCertificates)

// /* timetable */

// router.route('/timetable').post(verifyToken, postTimetable)
// router.route('/timetable').get(verifyToken, getTimetable)
// router.route('/timetable/:id').get(verifyToken, getTimetableById)
// router.route('/timetable/:id').patch(verifyToken, updateTimetable)
// router.route('/timetable/:id').delete(verifyToken, deleteTimetable)

// /* profile */

// router.route('/profile').post(verifyToken, uploadProfile, postProfile);
// router.route('/profile/:id').get(verifyToken, getProfile);
// router.route('/profile/:id').patch(verifyToken, uploadProfile, updateProfile );


import express from 'express';
import verifyToken from '../middleware/auth.js';

// Upload middlewares
import uploadProfile from '../upload/profile.js';
import uploadCourse from '../upload/courseList.js';
import uploadDocument from '../upload/document.js';
import uploadTeacher from '../upload/teacher.js';
import uploadCertificates from '../upload/certificates.js';
import uploadStudentresult from '../upload/studentresult.js';

// Controllers
import { 
  deleteBranch, getBranch, getBranchById, postBranch, updateBranch 
} from '../controllers/branchControllers.js';

import { 
  deleteExam, getExam, getExamById, postExam, updateExam 
} from '../controllers/examControllers.js';

import { 
  postCourselist, getCourselist, getCourselistById, updateCourselist, deleteCourselist 
} from '../controllers/courselistControllers.js';

import { 
  deleteDocumentsharing, getDocumentsharing, getDocumentsharingById, postDocumentsharing, updateDocumentsharing 
} from '../controllers/documentsharingControllers.js';

import { 
  deleteAllAssignment, getAllAssignment, getAllAssignmentById, postAllAssignment, updateAllAssignment 
} from '../controllers/allAssignmentControllers.js';

import { 
  deleteStudentsAssignment, getStudentsAssignment, getStudentsAssignmentById, postStudentsAssignment, updateStudentsAssignment 
} from '../controllers/studentsAssignmentControllers.js';

import { 
  postTeacher, deleteTeacher, getTeacher, getTeacherById, updateTeacher 
} from '../controllers/teacherControllers.js';

import { 
  deletedResult, getResult, getResultById, postResult, updatedResult 
} from '../controllers/resultControllers.js';

import { 
  deleteAllStudents, getAllStudents, getAllStudentsById, postAllStudents, updateAllStudents 
} from '../controllers/allstudentsControllers.js';

import { 
  deleteCertificates, getCertificates, getCertificatesById, postCertificates, updateCertificates 
} from '../controllers/certificatesControllers.js';

import { 
  deleteTimetable, getTimetable, getTimetableById, postTimetable, updateTimetable 
} from '../controllers/timetableControllers.js';

import { postAdmin, postForgot } from '../controllers/authControllers.js';

import { 
  deleteStudentresult, getStudentresult, getStudentresultById, postStudentresult, updateStudentresult 
} from '../controllers/studentresultControllers.js';

import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';

import { 
  createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff 
} from '../controllers/staffController.js';

import { 
  createLiveClass, getAllLiveClasses, getLiveClassById, updateLiveClass, deleteLiveClass 
} from '../controllers/liveClassController.js';

import { 
  createRecordedClass, getAllRecordedClasses, getRecordedClassById, updateRecordedClass, deleteRecordedClass 
} from '../controllers/recordedClassesController.js';

import { 
  createBill, getAllBills, getBillById, updateBill, deleteBill 
} from '../controllers/billController.js';

import { 
  createAttendance, getAllAttendance, getAttendanceById, updateAttendance, deleteAttendance 
} from '../controllers/attendanceController.js';

import { 
  createHoliday, getAllHolidays, getHolidayById, updateHoliday, deleteHoliday 
} from '../controllers/holidayController.js';

import { 
  createLeaveRequest, getAllLeaveRequests, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest 
} from '../controllers/leaveRequestController.js';

import { 
  createLeaveStatus, getAllLeaveStatus, getLeaveStatusById, updateLeaveStatus, deleteLeaveStatus 
} from '../controllers/leaveStatusController.js';

const router = express.Router();

/* =================== AUTH =================== */
router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

/* =================== Branch =================== */
router.route('/branch')
  .post(verifyToken, postBranch)
  .get(verifyToken, getBranch);

router.route('/branch/:id')
  .get(verifyToken, getBranchById)
  .patch(verifyToken, updateBranch)
  .delete(verifyToken, deleteBranch);

/* =================== Exam =================== */
router.route('/exam')
  .post(verifyToken, postExam)
  .get(verifyToken, getExam);

router.route('/exam/:id')
  .get(verifyToken, getExamById)
  .patch(verifyToken, updateExam)
  .delete(verifyToken, deleteExam);

/* =================== Course List =================== */
router.route('/courselist')
  .post(verifyToken, uploadCourse, postCourselist)
  .get(verifyToken, getCourselist);

router.route('/courselist/:id')
  .get(verifyToken, getCourselistById)
  .patch(verifyToken, uploadCourse, updateCourselist)
  .delete(verifyToken, deleteCourselist);

/* =================== Document Sharing =================== */
router.route('/documentsharing')
  .post(verifyToken, uploadDocument, postDocumentsharing)
  .get(verifyToken, getDocumentsharing);

router.route('/documentsharing/:id')
  .get(verifyToken, getDocumentsharingById)
  .patch(verifyToken, uploadDocument, updateDocumentsharing)
  .delete(verifyToken, deleteDocumentsharing);

/* =================== Assignment =================== */
router.route('/allAssignment')
  .post(verifyToken, postAllAssignment)
  .get(verifyToken, getAllAssignment);

router.route('/allAssignment/:id')
  .get(verifyToken, getAllAssignmentById)
  .patch(verifyToken, updateAllAssignment)
  .delete(verifyToken, deleteAllAssignment);

router.route('/studentsAssignment')
  .post(verifyToken, postStudentsAssignment)
  .get(verifyToken, getStudentsAssignment);

router.route('/studentsAssignment/:id')
  .get(verifyToken, getStudentsAssignmentById)
  .patch(verifyToken, updateStudentsAssignment)
  .delete(verifyToken, deleteStudentsAssignment);

/* =================== Result =================== */
router.route('/result')
  .post(verifyToken, postResult)
  .get(verifyToken, getResult);

router.route('/result/:id')
  .get(verifyToken, getResultById)
  .patch(verifyToken, updatedResult)
  .delete(verifyToken, deletedResult);

/* =================== Student Result =================== */
router.route('/studentresult')
  .post(verifyToken, uploadStudentresult, postStudentresult);

router.route('/studentresult/:resultId')
  .get(verifyToken, getStudentresult);

router.route('/studentresult/:id/:resultId')
  .get(verifyToken, getStudentresultById)
  .patch(verifyToken, uploadStudentresult, updateStudentresult)
  .delete(verifyToken, deleteStudentresult);

/* =================== Teacher =================== */
router.route('/teacher')
  .post(verifyToken, uploadTeacher, postTeacher)
  .get(verifyToken, getTeacher);

router.route('/teacher/:id')
  .get(verifyToken, getTeacherById)
  .patch(verifyToken, uploadTeacher, updateTeacher)
  .delete(verifyToken, deleteTeacher);

/* =================== Students =================== */
router.route('/allstudents')
  .post(verifyToken, postAllStudents)
  .get(verifyToken, getAllStudents);

router.route('/allstudents/:id')
  .get(verifyToken, getAllStudentsById)
  .patch(verifyToken, updateAllStudents)
  .delete(verifyToken, deleteAllStudents);

/* =================== Certificates =================== */
router.route('/certificates')
  .post(verifyToken, uploadCertificates, postCertificates)
  .get(verifyToken, getCertificates);

router.route('/certificates/:id')
  .get(verifyToken, getCertificatesById)
  .patch(verifyToken, uploadCertificates, updateCertificates)
  .delete(verifyToken, deleteCertificates);

/* =================== Timetable =================== */
router.route('/timetable')
  .post(verifyToken, postTimetable)
  .get(verifyToken, getTimetable);

router.route('/timetable/:id')
  .get(verifyToken, getTimetableById)
  .patch(verifyToken, updateTimetable)
  .delete(verifyToken, deleteTimetable);

/* =================== Profile =================== */
router.route('/profile')
  .post(verifyToken, uploadProfile, postProfile);

router.route('/profile/:id')
  .get(verifyToken, getProfile)
  .patch(verifyToken, uploadProfile, updateProfile);

/* =================== Staff =================== */
router.route('/staff')
  .post(verifyToken, createStaff)
  .get(verifyToken, getAllStaff);

router.route('/staff/:id')
  .get(verifyToken, getStaffById)
  .patch(verifyToken, updateStaff)
  .delete(verifyToken, deleteStaff);

/* =================== Live Class =================== */
router.route('/live-class')
  .post(verifyToken, createLiveClass)
  .get(verifyToken, getAllLiveClasses);

router.route('/live-class/:id')
  .get(verifyToken, getLiveClassById)
  .patch(verifyToken, updateLiveClass)
  .delete(verifyToken, deleteLiveClass);

/* =================== Recorded Class =================== */
router.route('/recorded-class')
  .post(verifyToken, createRecordedClass)
  .get(verifyToken, getAllRecordedClasses);

router.route('/recorded-class/:id')
  .get(verifyToken, getRecordedClassById)
  .patch(verifyToken, updateRecordedClass)
  .delete(verifyToken, deleteRecordedClass);

/* =================== Bill =================== */
router.route('/bill')
  .post(verifyToken, createBill)
  .get(verifyToken, getAllBills);

router.route('/bill/:id')
  .get(verifyToken, getBillById)
  .patch(verifyToken, updateBill)
  .delete(verifyToken, deleteBill);

/* =================== Attendance =================== */
router.route('/attendance')
  .post(verifyToken, createAttendance)
  .get(verifyToken, getAllAttendance);

router.route('/attendance/:id')
  .get(verifyToken, getAttendanceById)
  .patch(verifyToken, updateAttendance)
  .delete(verifyToken, deleteAttendance);

/* =================== Holiday =================== */
router.route('/holiday')
  .post(verifyToken, createHoliday)
  .get(verifyToken, getAllHolidays);

router.route('/holiday/:id')
  .get(verifyToken, getHolidayById)
  .patch(verifyToken, updateHoliday)
  .delete(verifyToken, deleteHoliday);

/* =================== Leave Request =================== */
router.route('/leave-request')
  .post(verifyToken, createLeaveRequest)
  .get(verifyToken, getAllLeaveRequests);

router.route('/leave-request/:id')
  .get(verifyToken, getLeaveRequestById)
  .patch(verifyToken, updateLeaveRequest)
  .delete(verifyToken, deleteLeaveRequest);

/* =================== Leave Status =================== */
router.route('/leave-status')
  .post(verifyToken, createLeaveStatus)
  .get(verifyToken, getAllLeaveStatus);

router.route('/leave-status/:id')
  .get(verifyToken, getLeaveStatusById)
  .patch(verifyToken, updateLeaveStatus)
  .delete(verifyToken, deleteLeaveStatus);

export default router;
