import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';
import { postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteExam, getExam, getExamById, postExam, updateExam } from '../controllers/examControllers.js';
import { deleteAllAssignment, getAllAssignment, getAllAssignmentById, postAllAssignment, updateAllAssignment } from '../controllers/allAssignmentControllers.js';
import { deleteStudentsAssignment, getStudentsAssignment, getStudentsAssignmentById, postStudentsAssignment, updateStudentsAssignment } from '../controllers/studentsAssignmentControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

router.route('/branch').post(postBranch);
router.route('/branch').get(getBranch);
router.route('/branch/:id').get(getBranchById);
router.route('/branch/:id').put(updateBranch);
router.route('/branch/:id').delete(deleteBranch);

router.route('/exam').post(postExam);
router.route('/exam').get(getExam);
router.route('/exam/:id').get(getExamById);
router.route('/exam/:id').patch(updateExam);
router.route('/exam/:id').delete(deleteExam);


router.route('/allAssignment').post(postAllAssignment);
router.route('/allAssignment').get(getAllAssignment);
router.route('/allAssignment/:id').get(getAllAssignmentById);
router.route('/allAssignment/:id').patch(updateAllAssignment);
router.route('/allAssignment/:id').delete(deleteAllAssignment);



router.route('/studentsAssignment').post(postStudentsAssignment);
router.route('/studentsAssignment').get(getStudentsAssignment);
router.route('/studentsAssignment/:id').get(getStudentsAssignmentById);
router.route('/studentsAssignment/:id').patch(updateStudentsAssignment);
router.route('/studentsAssignment/:id').delete(deleteStudentsAssignment);