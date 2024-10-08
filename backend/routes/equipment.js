import express from "express";
import Equipment from "../models/Equipments.js";

const router = express.Router();

router.post('/', async (req, res) => {
	const equipment = req.body;
	if(!equipment.name) {
		return res.status(400).json({ success: false, message: "Please provide the name" });
	}

	const newEquipment = new Equipment(equipment);

	try {
		await newEquipment.save();
		res.status(201).json({ success: true, data: newEquipment });
	} catch (error) {
		console.log("Error in create equipment: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

router.get('/', async (req, res) => {
	try {
		const equipments = await Equipment.find({});
		res.status(200).json({ success: true, data: equipments });
	} catch (error) {
		console.log("Error in get equipment: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

router.delete('/:id', async (req, res) => {
	const {id} = req.params;
	try {
		await Equipment.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Equipment Deleted" });
	} catch (error) {
		console.log("Error in delete equipment: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

export default router;