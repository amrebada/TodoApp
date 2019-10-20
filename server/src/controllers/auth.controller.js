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

  async getUserByToken(token) {
    let uid = JWT.verify(token, JWK.asKey(config.KEY));
    if (uid && uid.id) {
      try {
        let user = await Users.findById(uid.id);
        return user;
      } catch (error) {
        throw ApiError(ErrorTypes.NOT_FOUND, "user not found");
      }
    }
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

  async create(token, username, password, role) {
    if (!(await this.checkIfAdmin(token))) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Not Authorized to create user");
    }

    let hash = await bcrypt.hash(password, 10);
    console.log(hash);

    let user = new Users({
      username,
      password: hash,
      role
    });

    return await user.save();
  }

  async delete(token, userId) {
    if (!(await this.checkIfAdmin(token))) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Not Authorized to create user");
    }

    return await Users.findByIdAndDelete(userId);
  }

  async getAllUsers(token) {
    if (!(await this.checkIfAdmin(token))) {
      throw ApiError(ErrorTypes.FORBIDDEN, "Not Authorized to create user");
    }

    return await Users.find();
  }
}
module.exports = new Auth();
