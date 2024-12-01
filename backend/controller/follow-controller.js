import Follow from "../models/Follows.js";

export const createFollow = async (req, res) => {
	const user = req.user;
	const { followed_id } = req.body;
	try {
		const follow = new Follow({follower_id: user._id, followed_id});
		await follow.save();
		res.status(201).json({ success: true, message: "Successfully followed"});
	} catch (error) {
		console.log('Error in following', error.message);
		res.status(500).json({ success: true, message: error.message});
	}
}