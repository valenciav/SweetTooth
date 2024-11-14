import mongoose from "mongoose";
import Bookmark from "../models/Bookmark.js";

export const getBookmarks = async (req, res) => {
	try {
		const id = req.user._id;
		const bookmarks = await Bookmark.find({user: id}).populate("recipe");
		res.status(200).json({ success: true, data: bookmarks });
	} catch (error) {
		console.log("Error in getting bookmarked recipes: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const addBookmark = async (req, res) => {
	try {
		const id  = req.user._id;
		const { recipeId } = req.body;		
		const newBookmark = new Bookmark({user: id, recipe: recipeId});
		await newBookmark.save();
		const bookmark = await newBookmark.populate("recipe");
		res.status(200).json({ success: true, data: bookmark, message: "Bookmarked Recipe"});
	} catch (error) {
		console.log("Error in adding bookmark: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteBookmark = async (req, res) => {
	try {
		const id  = req.user._id;
		const { recipeId } = req.body;
		await Bookmark.deleteMany({user: id, recipe: recipeId});
		res.status(200).json({ success: true, message: "Unbookmarked Recipe"});
	} catch (error) {
		console.log("Error in deleting bookmark: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}