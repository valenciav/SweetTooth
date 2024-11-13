import express from "express";
import { createUser, editUser, deleteUser, checkUsernameAvailability, checkEmailAvailability, getProfile } from "../controller/user-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', createUser);
router.get('/getProfile', userVerification, getProfile);
router.get('/checkUsername/:username', checkUsernameAvailability);
router.get('/checkEmail/:email', checkEmailAvailability);
router.put('/:id', userVerification, editUser);
router.delete('/:id', deleteUser);

export default router;