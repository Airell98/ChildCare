function errorHandler(err, req, res, next) {
  let error = "INTERNAL_SERVER_ERROR";
  let errorMessage = "Something Went Wrong";
  let errorStatus = 500;

  if(err.name === 'INVALID_EMAIL_PASSWORD'){
    error = "INVALID_EMAIL_PASSWORD"
    errorMessage = "Email or Password is incorrect"
    errorStatus = 400
  } else if(err.name === 'ERR_NOT_FOUND'){
    err = "ERR_NOT_FOUND"
    error = "Can't find selected item"
    errorStatus = 404
  } else if(err.name === 'TOKEN_NOT_FOUND'){
    error = "TOKEN_NOT_FOUND",
    errorMessage = "Access token not exist"
    errorStatus = 404
  } else if(err.name === 'AUTHENTICATION_FAILED'){
    error = "AUTHENTICATION_FAILED"
    errorMessage = "Failed to authenticate"
    errorStatus = 403
  } else if(err.name === 'AUTHORIZATION_FAILED'){
    error = "AUTHORIZATION_FAILED"
    errorMessage = "You have no access"
    errorStatus = 400
  }

  res.status(errorStatus).json({
    error,
    errorMessage,
  });
}

module.exports = errorHandler;
