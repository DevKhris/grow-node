const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ User, logger }) {
    super(User, logger);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({
        where: { email: email },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getBySecureId(id) {
    try {
      return await this.model.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = UserRepository;
