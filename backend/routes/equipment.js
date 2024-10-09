import express from "express";
import { createEquipment, getEquipments, deleteEquipment } from "../controller/equipment-controller.js";

const router = express.Router();

router.post('/', createEquipment);
router.get('/', getEquipments);
router.delete('/:id', deleteEquipment)

export default router;