import express from "express";
import { signIn, signOut } from "../controller/authentication-controller.js";

const router = express.Router();

router.post('/signIn', signIn)
router.post('/signOut', signOut)

export default router;