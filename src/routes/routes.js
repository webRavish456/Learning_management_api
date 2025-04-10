import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';
import { postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
import { deleteTeacher, getTeacher, getTeacherById, postTeacher, updateTeacher } from '../controllers/teacherControllers.js';
import uploadTeacher from '../upload/teacher.js';


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

/* teacher */

router.route('/teacher').post(uploadTeacher, postTeacher);
router.route('/teacher').get(getTeacher);
router.route('/teacher/:id').get(getTeacherById);
router.route('/teacher/:id').patch(uploadTeacher, updateTeacher);
router.route('/teacher/:id').delete(deleteTeacher);