const { map } = require("../app");

function errorHandler(err, req, res, next) {
  // console.log(err);
  let error = "INTERNAL_SERVER_ERROR";
  let errorMessages = [];
  let errorStatus = 500;

  if (err.name === "INVALID_EMAIL_PASSWORD") {
    error = "INVALID_EMAIL_PASSWORD";
    errorMessages.push("Email or Password is incorrect");
    errorStatus = 400;
  } else if (err.name === "ERR_NOT_FOUND") {
    error = "ERR_NOT_FOUND";
    errorMessages.push("Can't find selected item");
    errorStatus = 404;
  } else if (err.name === "TOKEN_NOT_FOUND") {
    error = "TOKEN_NOT_FOUND";
    errorMessages.push("Access token not exist");
    errorStatus = 403;
  } else if (err.name === "AUTHENTICATION_FAILED") {
    error = "AUTHENTICATION_FAILED";
    errorMessages.push("Failed to authenticate");
    errorStatus = 403;
  } else if (err.name === "AUTHORIZATION_FAILED") {
    error = "AUTHORIZATION_FAILED";
    errorMessages.push("You have no access");
    errorStatus = 401;
  } else if (err.name === "SequelizeValidationError") {
    error = "BAD_REQUEST";
    errorStatus = 400;
    err.errors.map((error, index) => {
      errorMessages.push(error.message);
    });
  } else {
    errorMessages.push("Something went wrong");
  }

  res.status(errorStatus).json({
    error,
    errorMessages,
  });
}

module.exports = errorHandler;
