import express from "express";
import { createUser, checkUsernameAvailability, checkEmailAvailability, getUserByUsername, editProfile, deleteProfile } from "../controller/user-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', createUser);
router.get('/:username', getUserByUsername);
router.get('/checkUsername/:username', checkUsernameAvailability);
router.get('/checkEmail/:email', checkEmailAvailability);
router.put('/', userVerification, editProfile);
router.delete('/', deleteProfile);

export default router;