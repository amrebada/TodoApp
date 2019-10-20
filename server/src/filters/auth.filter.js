const Users = require("../models/users");
const ApiError = require("../models/constants/ApiError");
const ApiResponse = require("../models/constants/ApiResponse");
const ErrorTypes = require("../models/constants/ErrorTypes");
const config = require("../../config.json");
const { JWT, JWK } = require("jose");

//authentication and authorization
module.exports = async (req, res, next) => {
  if (
    req._parsedUrl.pathname === "/api/v1/login" &&
    req.method.toUpperCase() === "POST"
  ) {
    return next();
  }
  try {
    //check authentication
    let authentication = req.headers["Authentication"];
    if (!authentication) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Invalid authentication");
    }
    authentication = authentication.split(" ");
    if (authentication.length !== 2) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Invalid authentication");
    }
    let token = authentication[1];
    if (!token) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Invalid authentication");
    }
    const decodedUser = JWT.verify(token, JWK.asKey(config.KEY));
    const user = await Users.findById(decodedUser.id);
    if (!user) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Invalid authentication");
    }
    next();
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
};
