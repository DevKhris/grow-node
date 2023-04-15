class BaseRepository {
  constructor(model, logger = null) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.model.update(data, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      return await this.model.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;
