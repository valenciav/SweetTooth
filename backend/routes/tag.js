import express from "express";
import { createTag, deleteTag, getTags } from "../controller/tag-controller.js";

const router = express.Router();

router.post('/', createTag);
router.get('/', getTags);
router.delete('/:id', deleteTag);

export default router;