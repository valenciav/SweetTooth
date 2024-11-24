const ErrorHandler = (err, req, res, next) => {
	console.log(`Error ${err.status} in ${req.originalUrl}: ${err.message}`);
	res.status(err.status).json({ success: false, message: err.message});
}

export default ErrorHandler;