const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ where: { email: email } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
