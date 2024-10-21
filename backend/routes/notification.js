import express from "express";
import { createNotification, deleteNotification, editNotification, getNotifications } from "../controller/notification-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification, createNotification);
router.get('/', userVerification, getNotifications);
router.put('/:id', userVerification, editNotification);
router.delete('/:id', userVerification, deleteNotification);

export default router;