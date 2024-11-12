import express from "express";
import { addBookmark, deleteBookmark, getBookmarks } from "../controller/bookmark-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/', userVerification, getBookmarks);
router.post('/', userVerification, addBookmark);
router.delete('/', userVerification, deleteBookmark);

export default router;