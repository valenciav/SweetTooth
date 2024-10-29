const ErrorHandler = (err, req, res, next) => {
	console.log('Error handling middleware');
	console.log(err)
}

export default ErrorHandler;