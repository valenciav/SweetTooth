import mongoose from "mongoose";
import Notification from "../models/Notifications.js";

export const createNotification = async (req, res) => {
	const notification = req.body;
	if(!notification.user || !notification.message) {
		return res.status(400).json({ success: false, message: "Please provide the all required information" });
	}

	const newNotification = new Notification(notification);

	try {
		await newNotification.save();
		res.status(201).json({ success: true, data: newNotification });
	} catch (error) {
		console.log("Error in create notification: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find({});
		res.status(200).json({ success: true, data: notifications });
	} catch (error) {
		console.log("Error in get notification: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const editNotification = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Notification not found" });
	}
	const notificationUpdate = req.body;
	try {
		const notification = await Notification.findByIdAndUpdate(id, notificationUpdate, {new: true});
		res.status(200).json({ success: true, data: notification });
	} catch (error) {
		console.log("Error in update notification: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteNotification = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Notification not found" });
	}
	try {
		await Notification.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Notification Deleted" });
	} catch (error) {
		console.log("Error in delete notification: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}