import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';
import { postForgot } from '../controllers/authControllers.js';
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

router.route('/courselist').post(uploadCourse, postCourselist);
router.route('/courselist').get(getCourselist);
router.route('/courselist/:id').get(getCourselistById);
router.route('/courselist/:id').patch(uploadCourse, updateCourselist);
router.route('/courselist/:id').delete(deleteCourselist);

router.route('/documentsharing').post(uploadDocument, postDocumentsharing);
router.route('/documentsharing').get(getDocumentsharing);
router.route('/documentsharing/:id').get(getDocumentsharingById);
router.route('/documentsharing/:id').patch(uploadDocument, updateDocumentsharing);
router.route('/documentsharing/:id').delete(deleteDocumentsharing);