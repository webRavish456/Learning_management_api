import express from 'express'
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
import { postCourselist } from '../controllers/courselistControllers.js';
import { getCourselist } from '../controllers/courselistControllers.js';
import { getCourselistById } from '../controllers/courselistControllers.js';
import { updateCourselist } from '../controllers/courselistControllers.js';
import { deleteCourselist } from '../controllers/courselistControllers.js';
import uploadCourse from '../upload/courseList.js';
import { deleteDocumentsharing, getDocumentsharing, getDocumentsharingById, postDocumentsharing, updateDocumentsharing } from '../controllers/documentsharingControllers.js';
import uploadDocument from '../upload/document.js';
import { deleteAllAssignment, getAllAssignment, getAllAssignmentById, postAllAssignment, updateAllAssignment } from '../controllers/allAssignmentControllers.js';
import { deleteStudentsAssignment, getStudentsAssignment, getStudentsAssignmentById, postStudentsAssignment, updateStudentsAssignment } from '../controllers/studentsAssignmentControllers.js';
import { postTeacher } from '../controllers/teacherControllers.js';
import { deletedResult, getResult, getResultById, postResult, updatedResult } from '../controllers/resultControllers.js';

import { deleteTeacher, getTeacher, getTeacherById, updateTeacher } from '../controllers/teacherControllers.js';
import uploadTeacher from '../upload/teacher.js';

import { deleteAllStudents, getAllStudents, getAllStudentsById, postAllStudents, updateAllStudents } from '../controllers/allstudentsControllers.js';

import { deleteCertificates, getCertificates, getCertificatesById, postCertificates, updateCertificates } from '../controllers/certificatesControllers.js';

import { deleteTimetable, getTimetable, getTimetableById, postTimetable, updateTimetable } from '../controllers/timetableControllers.js';

import uploadCertificates from '../upload/certificates.js';
import verifyToken from '../middleware/auth.js';
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteStudentresult, getStudentresult, getStudentresultById, postStudentresult, updateStudentresult } from '../controllers/studentresultControllers.js';
import uploadStudentresult from '../upload/studentresult.js';
import uploadProfile from '../upload/profile.js';
import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';



export const router = express.Router();

/* verifyToken */

router.route('/login').post(postAdmin);     //generate token or expire date
router.route('/forgot').post(postForgot);

/* branch */

router.route('/branch').post(verifyToken, postBranch);
router.route('/branch').get(verifyToken, getBranch);
router.route('/branch/:id').get(verifyToken, getBranchById);
router.route('/branch/:id').patch(verifyToken, updateBranch);
router.route('/branch/:id').delete(verifyToken, deleteBranch);

/* exam */

router.route('/exam').post(verifyToken, postExam);
router.route('/exam').get(verifyToken, getExam);
router.route('/exam/:id').get(verifyToken, getExamById);
router.route('/exam/:id').patch(verifyToken, updateExam);
router.route('/exam/:id').delete(verifyToken, deleteExam);

/* course */

router.route('/courselist').post(verifyToken, uploadCourse, postCourselist);
router.route('/courselist').get(verifyToken, getCourselist);
router.route('/courselist/:id').get(verifyToken, getCourselistById);
router.route('/courselist/:id').patch(verifyToken, uploadCourse, updateCourselist);
router.route('/courselist/:id').delete(verifyToken, deleteCourselist);



router.route('/documentsharing').post(verifyToken, uploadDocument, postDocumentsharing);
router.route('/documentsharing').get(verifyToken, getDocumentsharing);
router.route('/documentsharing/:id').get(verifyToken, getDocumentsharingById);
router.route('/documentsharing/:id').patch(verifyToken, uploadDocument, updateDocumentsharing);
router.route('/documentsharing/:id').delete(verifyToken, deleteDocumentsharing);

/* assignment */

router.route('/allAssignment').post(verifyToken, postAllAssignment);
router.route('/allAssignment').get(verifyToken, getAllAssignment);
router.route('/allAssignment/:id').get(verifyToken, getAllAssignmentById);
router.route('/allAssignment/:id').patch(verifyToken, updateAllAssignment);
router.route('/allAssignment/:id').delete(verifyToken, deleteAllAssignment);



router.route('/studentsAssignment').post(verifyToken, postStudentsAssignment);
router.route('/studentsAssignment').get(verifyToken, getStudentsAssignment);
router.route('/studentsAssignment/:id').get(verifyToken, getStudentsAssignmentById);
router.route('/studentsAssignment/:id').patch(verifyToken, updateStudentsAssignment);
router.route('/studentsAssignment/:id').delete(verifyToken, deleteStudentsAssignment);

/* result */

router.route('/result').post(verifyToken, postResult);
router.route('/result').get(verifyToken, getResult);
router.route('/result/:id').get(verifyToken, getResultById);
router.route('/result/:id').patch(verifyToken, updatedResult);
router.route('/result/:id').delete(verifyToken, deletedResult);

/* student result*/ 
router.route('/studentresult').post(verifyToken, uploadStudentresult, postStudentresult);
router.route('/studentresult/:resultId').get(verifyToken, getStudentresult);
router.route('/studentresult/:id/:resultId').get(verifyToken, getStudentresultById);
router.route('/studentresult/:id/:resultId').patch(verifyToken, uploadStudentresult, updateStudentresult);
router.route('/studentresult/:id/:resultId').delete(verifyToken, deleteStudentresult);


/* teacher */

router.route('/teacher').post(verifyToken, uploadTeacher, postTeacher);
router.route('/teacher').get(verifyToken, getTeacher);
router.route('/teacher/:id').get(verifyToken, getTeacherById);
router.route('/teacher/:id').patch(verifyToken, uploadTeacher, updateTeacher);
router.route('/teacher/:id').delete(verifyToken, deleteTeacher);

/* student */

router.route('/allstudents').post(verifyToken, postAllStudents)
router.route('/allstudents').get(verifyToken, getAllStudents)
router.route('/allstudents/:id').get(verifyToken, getAllStudentsById)
router.route('/allstudents/:id').patch(verifyToken, updateAllStudents)
router.route('/allstudents/:id').delete(verifyToken, deleteAllStudents)

/* certificate */

router.route('/certificates').post(verifyToken, uploadCertificates, postCertificates)
router.route('/certificates').get(verifyToken, getCertificates)
router.route('/certificates/:id').get(verifyToken, getCertificatesById)
router.route('/certificates/:id').patch(verifyToken, uploadCertificates, updateCertificates)
router.route('/certificates/:id').delete(verifyToken, deleteCertificates)

/* timetable */

router.route('/timetable').post(verifyToken, postTimetable)
router.route('/timetable').get(verifyToken, getTimetable)
router.route('/timetable/:id').get(verifyToken, getTimetableById)
router.route('/timetable/:id').patch(verifyToken, updateTimetable)
router.route('/timetable/:id').delete(verifyToken, deleteTimetable)

/* profile */

router.route('/profile').post(verifyToken, uploadProfile, postProfile);
router.route('/profile/:id').get(verifyToken, getProfile);
router.route('/profile/:id').patch(verifyToken, uploadProfile, updateProfile );
