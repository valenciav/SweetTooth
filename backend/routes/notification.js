import express from "express";
import { createNotification, deleteNotification, editNotification, getNotifications } from "../controller/notification-controller.js";

const router = express.Router();

router.post('/', createNotification);
router.get('/', getNotifications);
router.put('/:id', editNotification);
router.delete('/:id', deleteNotification);

export default router;