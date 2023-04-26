class BaseService {
  constructor({ logger }, repository) {
    this.repository = repository;
    this.logger = logger;
  }

  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = BaseService;
