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

      let registeredUser = this.userRepository.create(user);

      return registeredUser;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.userRepository.getByEmail(email);

      if (await bcrypt.compare(password, user.password)) {
        token = jwt.sign(user, process.env.APP_KEY);
        return token;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
