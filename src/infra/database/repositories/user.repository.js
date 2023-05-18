const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({
        where: { email: email },
      });
    } catch (error) {
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
      throw error;
    }
  }
}

module.exports = UserRepository;
