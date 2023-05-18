const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const BaseService = require("./base.service");

class AuthService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.userRepository = UserRepository;
  }

  async generateSalt() {
    try {
      const salt = await bcrypt.genSalt(20);
      return salt;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data) {
    try {
      const userData = {
        email: data.email,
        password: await bcrypt.hash(
          data.password,
          parseInt(this.generateSalt())
        ),
      };
      return this.userRepository
        .create(userData)
        .then((result) => {
          return {
            id: result.id,
            email: result.email,
          };
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      return await this.userRepository
        .getByEmail(email)
        .then(async (result) => {
          return await this.validateUser(result, password);
        })
        .catch((err) => {
          this.logger.error(err);
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async validateUser(user, password) {
    try {
      return await bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            return false;
          }
          return jwt.sign({ id: user.id, email: user.email }, process.env.KEY);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
  async getUserInfo(id) {
    try {
      return await this.userRepository
        .getBySecureId(id)
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
