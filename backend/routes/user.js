import express from "express";
import { createUser, getUserByUsername, editUser, deleteUser, getUserByEmail, getUserData } from "../controller/user-controller.js";

const router = express.Router();

router.post('/', createUser);
router.get('/getByUsername/:username', getUserByUsername);
router.get('/getByEmail/:email', getUserByEmail);
router.get('/getUserData', getUserData)
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

export default router;