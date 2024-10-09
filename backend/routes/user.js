import express from "express";
import { createUser, getUser, editUser, deleteUser } from "../controller/user-controller.js";

const router = express.Router();

router.post('/', createUser);
router.get('/', getUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

export default router;