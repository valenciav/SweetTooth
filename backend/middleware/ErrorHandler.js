const ErrorHandler = (err, req, res, next) => {
	console.log(`Error ${err.status} in ${req.originalUrl}: ${err.message}`);
}

export default ErrorHandler;