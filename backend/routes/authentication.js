import express from "express";
import { signIn, signOut } from "../controller/authentication-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/signIn', signIn)
router.post('/signOut', signOut)
router.post('/', userVerification);

export default router;