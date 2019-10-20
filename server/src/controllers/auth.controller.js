const Users = require("../models/users");
const ErrorTypes = require("../models/constants/ErrorTypes");
const ApiError = require("../models/constants/ApiError");
const bcrypt = require("bcrypt");
const config = require("../../config.json");
const { JWT, JWK } = require("jose");

class Auth {
  async login(username, password) {
    let user = await Users.findOne({ username });
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, "user not found");
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async (err, Equal) => {
        if (err) {
          reject(ApiError(ErrorTypes.INTERNAL_ERROR, "interntal server error"));
        }
        if (Equal) {
          let token = JWT.sign({ id: user._id }, JWK.asKey(config.KEY), {
            expiresIn: "1d"
          });
          resolve({ token });
        }

        reject(ApiError(ErrorTypes.FORBIDDEN, "invalid password "));
      });
    });
  }
  async checkIfAdmin(token) {
    let admin = JWT.verify(token, JWK.asKey(config.KEY));

    if (admin && admin.id) {
      try {
        let user = await Users.findById(admin.id);
        return user.role === 1;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
}
module.exports = new Auth();
