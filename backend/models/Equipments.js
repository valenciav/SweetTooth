import mongoose, { Schema } from "mongoose";

const equipmentSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
})

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;