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
      let salt = this.generateSalt();
      const user = {
        email: data.email,
        password: await bcrypt.hash(data.password, parseInt(salt)),
      };
      const registeredUser = this.userRepository.create(user);
      return {
        id: registeredUser.id,
        email: registeredUser.email,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (user) {
        const validatedUser = await bcrypt.compare(password, user.password);
        if (validatedUser) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.APP_KEY
          );
          return token;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  getUserInfo(id) {
    try {
      const user = this.userRepository.getBySecureId(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
