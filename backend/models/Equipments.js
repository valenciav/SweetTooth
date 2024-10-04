import mongoose, { Schema } from "mongoose";

const equipmenttSchema = new Schema({
	name: {
		type: String,
		required: true
	}
})

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;