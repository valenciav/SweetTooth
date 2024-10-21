import express from "express";
import { createEquipment, getEquipments, deleteEquipment } from "../controller/equipment-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification, createEquipment);
router.get('/', getEquipments);
router.delete('/:id', deleteEquipment)

export default router;