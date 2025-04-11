import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';
import { postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
import { postTeacher } from '../controllers/teacherControllers.js';
import { deletedResult, getResult, getResultById, postResult, updatedResult } from '../controllers/resultControllers.js';

import { deleteTeacher, getTeacher, getTeacherById, updateTeacher } from '../controllers/teacherControllers.js';
import uploadTeacher from '../upload/teacher.js';

import { deleteAllStudents, getAllStudents, getAllStudentsById, postAllStudents, updateAllStudents } from '../controllers/allstudentsControllers.js';

import { deleteCertificates, getCertificates, getCertificatesById, postCertificates, updateCertificates } from '../controllers/certificatesControllers.js';

import { deleteTimetable, getTimetable, getTimetableById, postTimetable, updateTimetable } from '../controllers/timetableControllers.js';

import uploadCertificates from '../upload/certificates.js';


export const router = express.Router();

/* Auth */

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

/* branch */

router.route('/branch').post(postBranch);
router.route('/branch').get(getBranch);
router.route('/branch/:id').get(getBranchById);
router.route('/branch/:id').put(updateBranch);
router.route('/branch/:id').delete(deleteBranch);

/* exam */

router.route('/exam').post(postExam);
router.route('/exam').get(getExam);
router.route('/exam/:id').get(getExamById);
router.route('/exam/:id').patch(updateExam);
router.route('/exam/:id').delete(deleteExam);

router.route('/result').post(postResult);
router.route('/result').get(getResult);
router.route('/result/:id').get(getResultById);
router.route('/result/:id').patch(updatedResult);
router.route('/result/:id').delete(deletedResult);

//  router.route('/teacher').post(postTeacher);
/* teacher */

router.route('/teacher').post(uploadTeacher, postTeacher);
router.route('/teacher').get(getTeacher);
router.route('/teacher/:id').get(getTeacherById);
router.route('/teacher/:id').patch(uploadTeacher, updateTeacher);
router.route('/teacher/:id').delete(deleteTeacher);

router.route('/allstudents').post(postAllStudents)
router.route('/allstudents').get(getAllStudents)
router.route('/allstudents/:id').get(getAllStudentsById)
router.route('/allstudents/:id').patch(updateAllStudents)
router.route('/allstudents/:id').delete(deleteAllStudents)

router.route('/certificates').post(uploadCertificates, postCertificates)
router.route('/certificates').get(getCertificates)
router.route('/certificates/:id').get(getCertificatesById)
router.route('/certificates/:id').patch(uploadCertificates, updateCertificates)
router.route('/certificates/:id').delete(deleteCertificates)

router.route('/timetable').post(postTimetable)
router.route('/timetable').get(getTimetable)
router.route('/timetable/:id').get(getTimetableById)
router.route('/timetable/:id').patch(updateTimetable)
router.route('/timetable/:id').delete(deleteTimetable)