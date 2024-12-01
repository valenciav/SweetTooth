import express from "express";
import { getAuthenticatedUser, signIn, signOut } from "../controller/authentication-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/signIn', signIn)
router.post('/signOut', signOut)
router.get('/', userVerification, getAuthenticatedUser);

export default router;