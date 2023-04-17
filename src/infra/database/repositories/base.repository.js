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

  async get(options) {
    try {
      return await this.model.findOne(options);
    } catch (error) {
      throw error;
    }
  }
  async getAll(options = null) {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      throw error;
    }
  }

  async getAllCount(options = null) {
    try {
      return await this.model.findAndCountAll(options);
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

  async update(options, data) {
    try {
      return await this.model.update(data, options);
    } catch (error) {
      throw error;
    }
  }

  async delete(options) {
    try {
      return await this.model.destroy(options);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;
