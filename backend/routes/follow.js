import express from "express";
import { createFollow } from "../controller/follow-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification, createFollow);

export default router;