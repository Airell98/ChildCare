function errorHandler(err, req, res, next) {
  let error = "INTERNAL_SERVER_ERROR";
  let errorMessage = "Something Went Wrong";
  let errorStatus = 500;

  res.status(errorStatus).json({
    error,
    errorMessage,
  });
}

module.exports = errorHandler;
