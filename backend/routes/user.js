import express from "express";
import { createUser, editUser, deleteUser, getBookmarks, addBookmark, checkUsernameAvailability, checkEmailAvailability, getProfile } from "../controller/user-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";
import AsyncHandler from "../middleware/AsyncHandler.js";

const router = express.Router();

router.post('/', createUser);
router.get('/getProfile', userVerification, AsyncHandler(getProfile));
router.get('/checkUsername/:username', checkUsernameAvailability);
router.get('/checkEmail/:email', checkEmailAvailability);
router.get('/getBookmarks', userVerification, getBookmarks);
router.post('/addBookmark', userVerification, addBookmark);
router.put('/:id', userVerification, editUser);
router.delete('/:id', deleteUser);

export default router;