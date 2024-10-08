import express from "express";
import Tag from "../models/Tags.js";

const router = express.Router();
router.post('/', async (req, res) => {
	const tag = req.body;
	if(!tag.name) {
		return res.status(400).json({ success: false, message: "Please provide the name" });
	}

	const newTag = new Tag(tag);

	try {
		await newTag.save();
		res.status(201).json({ success: true, data: newTag });
	} catch (error) {
		console.log("Error in create tag: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

router.get('/', async (req, res) => {
	try {
		const tags = await Tag.find({});
		res.status(200).json({ success: true, data: tags });
	} catch (error) {
		console.log("Error in get tag: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

router.delete('/:id', async (req, res) => {
	const {id} = req.params;
	try {
		await Tag.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Tag Deleted" });
	} catch (error) {
		console.log("Error in delete tag: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

export default router;